import { BadRequestException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

// Words used in the error message when the relation name reads badly.
const LABELS: Record<string, [singular: string, plural: string]> = {
  children: ['sub-location', 'sub-locations'],
  createdTasks: ['task they created', 'tasks they created'],
  updatedTasks: ['task they updated', 'tasks they updated'],
  checkedOutAssets: ['checked-out asset', 'checked-out assets'],
};

const humanize = (field: string, count: number) => {
  const [singular, plural] =
    LABELS[field] ??
    (() => {
      const words = field
        .replace(/([A-Z])/g, ' $1')
        .toLowerCase()
        .trim();
      return [words.replace(/s$/, ''), words] as [string, string];
    })();
  return count === 1 ? singular : plural;
};

/**
 * Throws a 400 listing what still points at a record, so deletes never fail with a raw
 * foreign-key error or silently blank out other records' links.
 * Relations that explicitly cascade or set null on delete (e.g. notifications) are ignored.
 */
export async function assertNotInUse(
  prisma: PrismaService,
  modelName: string,
  id: number,
  label?: string,
) {
  const models = Prisma.dmmf.datamodel.models;
  const model = models.find(
    (m) => m.name.toLowerCase() === modelName.toLowerCase(),
  );
  if (!model) return;

  const blocking = model.fields.filter((field) => {
    if (field.kind !== 'object' || !field.isList) return false;
    const opposite = models
      .find((m) => m.name === field.type)
      ?.fields.find(
        (f) => f.relationName === field.relationName && f.name !== field.name,
      );
    // Self-relations (Location.children) have an opposite on the same model.
    const rule = opposite?.relationOnDelete;
    return rule !== 'Cascade' && rule !== 'SetNull';
  });
  if (!blocking.length) return;

  const delegate = (
    prisma as unknown as Record<
      string,
      {
        findUnique(
          args: unknown,
        ): Promise<{ _count: Record<string, number> } | null>;
      }
    >
  )[modelName];
  const row = await delegate.findUnique({
    where: { id },
    select: {
      _count: {
        select: Object.fromEntries(blocking.map((f) => [f.name, true])),
      },
    },
  });
  if (!row) return;

  const counts = blocking
    .map((f) => ({ field: f.name, count: row._count[f.name] }))
    .filter((c) => c.count > 0);
  if (!counts.length) return;

  const usedBy = counts
    .map((c) => `${c.count} ${humanize(c.field, c.count)}`)
    .join(', ');
  throw new BadRequestException(
    `Cannot delete ${label ? `"${label}"` : 'this record'} because it is still used by ${usedBy}. Remove or reassign them first.`,
  );
}
