import { DAY, format, MINUTE, Pomo } from "../../mod.ts";
import { Timing, timings } from "../../timings.ts";

export interface GetPomoInput {
  pattern: string;
  timestamp?: string;
  format?: string;
}

export interface GetPomoOutput {
  elapsed: number;
  cycle: number;
  remainder: number;
  index: number;
  work: boolean;
  break: boolean;
  timeout: number;
  duration: number;
  start: number;
  end: number;
  timestamp: string;
  ref: number;
  text: string;
  timings: Timing[];
}

export function get(input: GetPomoInput): GetPomoOutput {
  const date = input.timestamp ? new Date(input.timestamp) : new Date();
  const at = date.getTime();
  const ref = date.setHours(0, 0, 0, 0);
  const pomo = Pomo.fromPattern({
    pattern: input.pattern,
    dayLength: DAY,
    scale: MINUTE,
    ref,
  });
  const stamp = pomo.at(at);
  const elapsed = stamp.elapsed;
  const cycle = stamp.cycle;
  const remainder = stamp.remainder;
  const index = stamp.index;
  const work = stamp.work;
  const timeout = stamp.timeout;
  const duration = stamp.duration;
  const start = stamp.start;
  const end = stamp.end;

  return {
    elapsed,
    cycle,
    remainder,
    index,
    work,
    break: !work,
    timeout,
    duration,
    start,
    end,
    timestamp: date.toString(),
    ref,
    text: format(stamp.timeout, input.format ?? "HH:mm:ss.SSS"),
    timings: timings({
      patterns: {
        [input.pattern]: input.pattern,
      },
      timestamp: input.timestamp,
    }),
  };
}

export function json(input: GetPomoInput): Response {
  return Response.json(get(input));
}
