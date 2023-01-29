import type { ColumnType, SelectQueryBuilder } from "../deps.ts";
import { Kysely, PostgresDialect, sql, z } from "../deps.ts";

// deno-lint-ignore no-explicit-any
const DATABASE_URI = Deno.env.get("DATABASE_URI") as any;
if (!DATABASE_URI) {
  throw new Error("DATABASE_URI is not set.");
}

export function getPgStorer<T>() {
  return new Kysely<T>({
    /**
     * TODO: Set $DATABASE_URI to the database URI in your environment.
     */
    dialect: new PostgresDialect(DATABASE_URI),
  });
}

/**
 * JSONB aggregation function for Kysely and Postgres.
 *
 * See:
 * https://github.com/koskimas/kysely/issues/103#issuecomment-1146880132
 */
export function jsonb_agg<
  DB,
  TB extends keyof DB,
  O = Record<string | number | symbol, never>,
>(
  qb: SelectQueryBuilder<DB, TB, O>,
) {
  return sql<
    O[]
  >`coalesce((select jsonb_agg(x) from (${qb}) x), '[]'::jsonb)`;
}

/** Zod utils. */
export const zutils = {
  generatedString(): z.ZodType<
    ColumnType<string, never, never>
  > {
    return z.lazy(() =>
      z.object({
        __select__: z.string(),
        __insert__: z.never(),
        __update__: z.never(),
      })
    );
  },

  generatedNumber(): z.ZodType<
    ColumnType<number, never, never>
  > {
    z.lazy(() =>
      z.object({
        __select__: z.number(),
        __insert__: z.never(),
        __update__: z.never(),
      })
    );
  },

  dateType(): z.ZodType<
    ColumnType<Date, Date | string | undefined, Date | string>
  > {
    return z.lazy(() =>
      z.object({
        __select__: z.date(),
        __insert__: z.date().or(z.string().or(z.undefined())),
        __update__: z.date().or(z.string()),
      })
    );
  },

  timestamps() {
    return {
      created_at: this.dateType(),
      updated_at: this.dateType(),
    };
  },
};
