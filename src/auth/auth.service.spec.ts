import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };
  const jwtService = {
    signAsync: jest.fn(),
    verifyAsync: jest.fn(),
  };
  const configService = {
    get: jest.fn(),
  };
  const service = new AuthService(
    prisma as never,
    jwtService as never,
    configService as never,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rejects sign in when the email does not exist', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.signIn(' Missing@Example.com ', 'strong-pass-123'),
    ).rejects.toEqual(
      new UnauthorizedException('Email or password is incorrect.'),
    );
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'missing@example.com' },
      omit: { passwordHash: false },
    });
  });

  it('rejects sign in when the password is incorrect', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: 'user@example.com',
      passwordHash: await bcrypt.hash('correct-password', 4),
    });

    await expect(
      service.signIn('user@example.com', 'wrong-password'),
    ).rejects.toEqual(
      new UnauthorizedException('Email or password is incorrect.'),
    );
  });

  describe('findUserForAas', () => {
    const account = {
      id: 7,
      email: 'officer@moc.gov.kh',
      username: 'officer',
      firstName: 'Sok',
      lastName: 'Chan',
      displayName: null,
      loginEnabled: true,
    };

    beforeEach(() => {
      configService.get.mockReturnValue('shared-secret');
    });

    it('returns the local user for a valid assertion', async () => {
      jwtService.verifyAsync.mockResolvedValue({
        purpose: 'aas-signin',
        email: ' Officer@MOC.gov.kh ',
      });
      prisma.user.findUnique.mockResolvedValue(account);

      const result = await service.findUserForAas('assertion');

      expect(jwtService.verifyAsync).toHaveBeenCalledWith('assertion', {
        secret: 'shared-secret',
      });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'officer@moc.gov.kh' },
      });
      expect(result.user).toMatchObject({ id: 7, email: 'officer@moc.gov.kh' });
    });

    it('rejects an assertion that fails verification', async () => {
      jwtService.verifyAsync.mockRejectedValue(new Error('jwt expired'));

      await expect(service.findUserForAas('bad')).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
      expect(prisma.user.findUnique).not.toHaveBeenCalled();
    });

    it('rejects a token that was not issued for AAS sign-in', async () => {
      jwtService.verifyAsync.mockResolvedValue({
        type: 'access',
        email: 'officer@moc.gov.kh',
      });

      await expect(service.findUserForAas('session')).rejects.toBeInstanceOf(
        UnauthorizedException,
      );
    });

    it('refuses an AAS user with no local account', async () => {
      jwtService.verifyAsync.mockResolvedValue({
        purpose: 'aas-signin',
        email: 'new@moc.gov.kh',
      });
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findUserForAas('assertion')).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });

    it('refuses a disabled local account', async () => {
      jwtService.verifyAsync.mockResolvedValue({
        purpose: 'aas-signin',
        email: 'officer@moc.gov.kh',
      });
      prisma.user.findUnique.mockResolvedValue({
        ...account,
        loginEnabled: false,
      });

      await expect(service.findUserForAas('assertion')).rejects.toBeInstanceOf(
        ForbiddenException,
      );
    });
  });
});
