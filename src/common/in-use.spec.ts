import { BadRequestException } from '@nestjs/common';
import { assertNotInUse } from './in-use';

describe('assertNotInUse', () => {
  const prismaReturning = (model: string, counts: Record<string, number>) => {
    const findUnique = jest.fn().mockResolvedValue({ _count: counts });
    return { prisma: { [model]: { findUnique } } as any, findUnique };
  };

  it('refuses and names what still uses the record', async () => {
    const { prisma } = prismaReturning('company', {
      locations: 0,
      departments: 0,
      assets: 3,
      users: 1,
    });

    await expect(assertNotInUse(prisma, 'company', 5, 'Acme')).rejects.toThrow(
      'Cannot delete "Acme" because it is still used by 3 assets, 1 user.',
    );
  });

  it('uses the singular for a single reference', async () => {
    const { prisma } = prismaReturning('location', { children: 1 });

    await expect(assertNotInUse(prisma, 'location', 5)).rejects.toThrow(
      '1 sub-location',
    );
  });

  it('passes when nothing references the record', async () => {
    const { prisma } = prismaReturning('company', {
      locations: 0,
      departments: 0,
      assets: 0,
      users: 0,
    });

    await expect(assertNotInUse(prisma, 'company', 5)).resolves.toBeUndefined();
  });

  it('ignores relations that cascade on delete', async () => {
    const { prisma, findUnique } = prismaReturning('user', {});

    await assertNotInUse(prisma, 'user', 5);

    const counted = Object.keys(
      findUnique.mock.calls[0][0].select._count.select,
    );
    expect(counted).not.toContain('notifications');
    expect(counted).toEqual(
      expect.arrayContaining(['tasks', 'checkedOutAssets']),
    );
  });

  it('throws a 400, not a raw database error', async () => {
    const { prisma } = prismaReturning('category', { assetModels: 2 });

    await expect(assertNotInUse(prisma, 'category', 5)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
