import type { SelectQueryBuilder } from "../deps.ts";
import { Kysely, PostgresDialect, sql } from "../deps.ts";
import { StoredPatternTableDescriptor } from "../v8n/stored_pattern_table_descriptor.ts";

// deno-lint-ignore no-explicit-any
const DATABASE_URI = Deno.env.get("DATABASE_URI") as any;
if (!DATABASE_URI) {
  throw new Error("DATABASE_URI is not set.");
}

export function getPgStorer<T>() {
  return new Kysely<T>({
    log: ["query", "error"],

    /**
     * TODO: Set $DATABASE_URI to the database URI in your environment.
     */
    dialect: new PostgresDialect(DATABASE_URI),
  });
}

export type StoredPatternStorer = Kysely<StoredPatternTableDescriptor>;

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
