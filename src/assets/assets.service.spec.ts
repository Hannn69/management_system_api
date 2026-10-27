import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssetsService } from './assets.service';

const deployable = { id: 1, name: 'Deployed', type: 'Deployable' };
const broken = { id: 4, name: 'Broken', type: 'Undeployable' };

describe('AssetsService', () => {
  let prisma: any;
  let service: AssetsService;

  beforeEach(() => {
    prisma = {
      asset: {
        findMany: jest.fn().mockResolvedValue([]),
        count: jest.fn().mockResolvedValue(0),
        findFirst: jest.fn(),
        create: jest.fn().mockResolvedValue({ id: 1 }),
        update: jest.fn().mockResolvedValue({ id: 1 }),
      },
      statusLabel: { findUnique: jest.fn() },
    };
    service = new AssetsService(prisma as PrismaService);
  });

  describe('status tabs', () => {
    const whereFor = async (category: string) => {
      await service.findAll({ category });
      const [args] = prisma.asset.findMany.mock.calls[0] as [
        { where: unknown },
      ];
      return args.where;
    };

    it('deployed = Deployable status that a user holds', async () => {
      expect(await whereFor('deployed')).toEqual({
        status: { type: 'Deployable' },
        checkedOutUserId: { not: null },
      });
    });

    it('ready = Deployable status that nobody holds', async () => {
      expect(await whereFor('ready')).toEqual({
        status: { type: 'Deployable' },
        checkedOutUserId: null,
      });
    });

    it.each([
      ['pending', 'Pending'],
      ['undeployable', 'Undeployable'],
      ['archive', 'Archived'],
    ])(
      '%s tab filters on status type %s, not on a status name',
      async (tab, type) => {
        expect(await whereFor(tab)).toEqual({ status: { type } });
      },
    );
  });

  describe('check-out rule', () => {
    it('refuses to create an asset checked out with a non-Deployable status', async () => {
      prisma.statusLabel.findUnique.mockResolvedValue(broken);

      await expect(
        service.create({ statusId: 4, checkedOutUserId: 9 } as any, 1),
      ).rejects.toBeInstanceOf(BadRequestException);
      expect(prisma.asset.create).not.toHaveBeenCalled();
    });

    it('allows a Deployable asset to be checked out', async () => {
      prisma.statusLabel.findUnique.mockResolvedValue(deployable);

      await service.create({ statusId: 1, checkedOutUserId: 9 } as any, 1);

      expect(prisma.asset.create).toHaveBeenCalled();
    });

    it('does not look at the status when nobody holds the asset', async () => {
      await service.create({ statusId: 4 } as any, 1);

      expect(prisma.statusLabel.findUnique).not.toHaveBeenCalled();
    });

    describe('update', () => {
      const held = {
        id: 1,
        statusId: 1,
        checkedOutUserId: 9,
        assetTag: 'AST-1',
        model: { name: 'm', category: { name: 'c' } },
        status: deployable,
      };

      beforeEach(() => {
        prisma.asset.findFirst.mockResolvedValue(held);
      });

      it('refuses to move a held asset to a non-Deployable status', async () => {
        prisma.statusLabel.findUnique.mockResolvedValue(broken);

        await expect(
          service.update(1, { statusId: 4 } as any, 1),
        ).rejects.toBeInstanceOf(BadRequestException);
        expect(prisma.asset.update).not.toHaveBeenCalled();
      });

      it('allows the same change once the user is cleared', async () => {
        prisma.statusLabel.findUnique.mockResolvedValue(broken);

        await service.update(
          1,
          { statusId: 4, checkedOutUserId: null } as any,
          1,
        );

        expect(prisma.asset.update).toHaveBeenCalled();
      });
    });
  });
});
