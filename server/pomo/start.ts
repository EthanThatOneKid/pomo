import type { PomoCollection } from "../../mod.ts";

export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;
export type ID = Timeout | Interval;

export function start(
  collection: PomoCollection,
  timestamp: number,
  fn: (name: string, period: number) => void,
  setTimeoutFn = setTimeout,
  setIntervalFn = setInterval,
): ID[] {
  const ids: number[] = [];
  for (const [name, timing] of collection.timings(timestamp)) {
    for (const { index, timeout } of timing.periods) {
      ids.push(
        setTimeoutFn(() => {
          fn(name, index);
          ids.push(
            setIntervalFn(
              () => fn(name, index),
              timing.interval,
            ),
          );
        }, timeout),
      );
    }
  }
  return ids;
}

export function cancel(ids: ID[]) {
  for (const id of ids) {
    clearTimeout(id);
    clearInterval(id);
  }
}
