import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: AuthPayloadDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.register(
      body.email,
      body.password,
    );
    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens);
    return { user };
  }

  @Post('signin')
  async signIn(
    @Body() body: AuthPayloadDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, tokens } = await this.authService.signIn(
      body.email,
      body.password,
    );
    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens);
    return { user };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Missing refresh token.');
    }

    const { user, tokens } = await this.authService.refresh(refreshToken);
    this.setAuthCookies(res, tokens.accessToken, tokens.refreshToken, tokens);
    return { user };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.['refresh_token'];
    if (refreshToken) {
      const userId = await this.authService.getUserIdFromRefreshToken(
        refreshToken,
      );
      if (userId) {
        await this.authService.logout(userId);
      }
    }

    const isProd = process.env.NODE_ENV === 'production';
    const cookieOptions = {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax' as const,
      path: '/',
    };
    res.clearCookie('access_token', cookieOptions);
    res.clearCookie('refresh_token', cookieOptions);
    return { success: true };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  me(@Req() req: Request) {
    return { user: req.user };
  }

  private setAuthCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
    tokens: { accessTtlMs: number; refreshTtlMs: number },
  ) {
    const isProd = process.env.NODE_ENV === 'production';
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: tokens.accessTtlMs,
      path: '/',
    });
    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      maxAge: tokens.refreshTtlMs,
      path: '/',
    });
  }
}
