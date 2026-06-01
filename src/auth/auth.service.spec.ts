import { UnauthorizedException } from '@nestjs/common';
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
});
