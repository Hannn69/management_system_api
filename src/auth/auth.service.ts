import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

type TokenBundle = {
  accessToken: string;
  refreshToken: string;
  accessTtlMs: number;
  refreshTtlMs: number;
};

const INVALID_CREDENTIALS_MESSAGE = 'Email or password is incorrect.';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existing) {
      throw new BadRequestException('Email already registered.');
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const username = normalizedEmail.split('@')[0];
    const user = await this.prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        username,
      },
    });

    const tokens = await this.issueTokens(user.id, user.email);
    await this.storeRefreshToken(
      user.id,
      tokens.refreshToken,
      tokens.refreshTtlMs,
    );

    return { user: { id: user.id, email: user.email }, tokens };
  }

  async signIn(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
      omit: { passwordHash: false },
    });
    if (!user || !user.loginEnabled) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      throw new UnauthorizedException(INVALID_CREDENTIALS_MESSAGE);
    }

    const tokens = await this.issueTokens(user.id, user.email);
    await this.storeRefreshToken(
      user.id,
      tokens.refreshToken,
      tokens.refreshTtlMs,
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
      },
      tokens,
    };
  }

  /**
   * Looks up the local account for a user the web app has already verified with the AAS identity
   * provider. The web app proves that with a short-lived JWT signed with the shared JWT_SECRET, so
   * this endpoint cannot be used to read accounts by email without that secret.
   */
  async findUserForAas(assertion: string) {
    const secret = this.configService.get<string>('JWT_SECRET');
    if (!secret) {
      throw new UnauthorizedException('AAS sign-in is not configured.');
    }

    let payload: { purpose?: string; email?: string };
    try {
      payload = await this.jwtService.verifyAsync(assertion, { secret });
    } catch {
      throw new UnauthorizedException('Invalid or expired AAS assertion.');
    }
    if (payload.purpose !== 'aas-signin' || !payload.email) {
      throw new UnauthorizedException('Invalid or expired AAS assertion.');
    }

    const user = await this.prisma.user.findUnique({
      where: { email: payload.email.trim().toLowerCase() },
    });
    if (!user) {
      throw new ForbiddenException(
        'No local account found for this AAS email. Ask an admin to create your account first.',
      );
    }
    if (!user.loginEnabled) {
      throw new ForbiddenException('This account is disabled.');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        displayName: user.displayName,
      },
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token.');
    }

    let payload: { sub: number | string; email: string };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    const userId =
      typeof payload.sub === 'string' ? Number(payload.sub) : payload.sub;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      omit: { refreshTokenHash: false, refreshTokenExpiresAt: false },
    });

    if (!user || !user.refreshTokenHash || !user.refreshTokenExpiresAt) {
      throw new UnauthorizedException('Refresh token expired.');
    }

    if (user.refreshTokenExpiresAt.getTime() < Date.now()) {
      throw new UnauthorizedException('Refresh token expired.');
    }

    const matches = await bcrypt.compare(refreshToken, user.refreshTokenHash);
    if (!matches) {
      throw new UnauthorizedException('Refresh token expired.');
    }

    const tokens = await this.issueTokens(user.id, user.email);
    await this.storeRefreshToken(
      user.id,
      tokens.refreshToken,
      tokens.refreshTtlMs,
    );

    return { user: { id: user.id, email: user.email }, tokens };
  }

  async logout(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: null, refreshTokenExpiresAt: null },
    });
  }

  async getUserIdFromRefreshToken(
    refreshToken: string,
  ): Promise<number | null> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const sub = payload.sub;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return typeof sub === 'string' ? Number(sub) : sub;
    } catch {
      return null;
    }
  }

  private async issueTokens(
    userId: number,
    email: string,
  ): Promise<TokenBundle> {
    const accessTtl = this.configService.get<string>('JWT_ACCESS_TTL', '15m');
    const refreshTtl = this.configService.get<string>('JWT_REFRESH_TTL', '7d');
    const accessTtlMs = this.parseDurationToMs(accessTtl);
    const refreshTtlMs = this.parseDurationToMs(refreshTtl);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: Math.floor(accessTtlMs / 1000),
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: Math.floor(refreshTtlMs / 1000),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
      accessTtlMs,
      refreshTtlMs,
    };
  }

  private async storeRefreshToken(
    userId: number,
    refreshToken: string,
    ttlMs: number,
  ) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 12);
    const refreshTokenExpiresAt = new Date(Date.now() + ttlMs);

    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash, refreshTokenExpiresAt },
    });
  }

  private parseDurationToMs(value: string) {
    const match = /^(\d+)([smhd])$/.exec(value.trim());
    if (!match) {
      return 15 * 60 * 1000;
    }
    const amount = Number(match[1]);
    const unit = match[2];
    switch (unit) {
      case 's':
        return amount * 1000;
      case 'm':
        return amount * 60 * 1000;
      case 'h':
        return amount * 60 * 60 * 1000;
      case 'd':
        return amount * 24 * 60 * 60 * 1000;
      default:
        return amount;
    }
  }
}
