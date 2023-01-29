import { z } from "../deps.ts";

/**
 * Zod utils.
 *
 * Taken from:
 * https://github.com/CodingGarden/fresh-spots/blob/ae8f373e58921763f5474c2146b86e363de771fd/app/db/zod-utils.ts
 */
export const zutils = {
  generatedString() {
    return z.lazy(() =>
      z.object({
        __select__: z.string(),
        __insert__: z.never(),
        __update__: z.never(),
      })
    );
  },

  generatedNumber() {
    return z.lazy(() =>
      z.object({
        __select__: z.number(),
        __insert__: z.never(),
        __update__: z.never(),
      })
    );
  },

  dateType() {
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
