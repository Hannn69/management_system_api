export type FilterKind = 'int' | 'string' | 'bool';

type RawQuery = Record<string, unknown>;

const parse = (
  value: unknown,
  kind: FilterKind,
): string | number | boolean | undefined => {
  if (value === undefined || value === null) return undefined;
  const text = (Array.isArray(value) ? String(value[0]) : String(value)).trim();
  if (text === '' || text === 'all') return undefined;
  if (kind === 'int') {
    const n = Number(text);
    return Number.isInteger(n) ? n : undefined;
  }
  if (kind === 'bool') {
    if (text === 'true') return true;
    if (text === 'false') return false;
    return undefined;
  }
  return text;
};

const parseDate = (value: unknown, endOfDay: boolean): Date | undefined => {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return undefined;
  const date = new Date(
    `${value}T${endOfDay ? '23:59:59.999' : '00:00:00.000'}Z`,
  );
  return Number.isNaN(date.getTime()) ? undefined : date;
};

/**
 * Turns whitelisted query-string values into a Prisma `where` fragment. Only the fields named in
 * `spec` are read (so a client cannot filter on arbitrary columns), and `createdFrom` /
 * `createdTo` (YYYY-MM-DD) bound `createdAt` when `dateField` is given.
 */
export function buildFilters(
  query: RawQuery,
  spec: Record<string, FilterKind>,
  dateField: string | null = 'createdAt',
): Record<string, unknown> {
  const where: Record<string, unknown> = {};

  for (const [field, kind] of Object.entries(spec)) {
    const value = parse(query[field], kind);
    if (value !== undefined) where[field] = value;
  }

  if (dateField) {
    const from = parseDate(query.createdFrom, false);
    const to = parseDate(query.createdTo, true);
    if (from || to) {
      where[dateField] = {
        ...(from ? { gte: from } : {}),
        ...(to ? { lte: to } : {}),
      };
    }
  }

  return where;
}
