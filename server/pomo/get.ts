import { format, PomoCollection, Timing } from "../../mod.ts";

export interface GetPomoInput {
  patterns: string;
  timestamp?: string;
  format?: string;
}

export interface GetPomoOutput {
  [key: string]: {
    elapsed: number;
    cycle: number;
    remainder: number;
    period: number;
    work: boolean;
    break: boolean;
    timeout: number;
    duration: number;
    start: number;
    end: number;
    timestamp: number;
    dayStart: number;
    text: string;
    timing: Timing;
  };
}

export function get(input: GetPomoInput): GetPomoOutput {
  const timestamp = new Date().getTime();
  const dayStart = new Date(timestamp).setHours(0, 0, 0, 0);
  const collection = PomoCollection.fromString(input.patterns, dayStart);
  return Object.entries(collection.data).reduce((data, [name, pomo]) => {
    const stamp = pomo.at(timestamp);
    const elapsed = stamp.elapsed;
    const cycle = stamp.cycle;
    const remainder = stamp.remainder;
    const period = stamp.period;
    const work = stamp.work;
    const timeout = stamp.timeout;
    const duration = stamp.duration;
    const start = stamp.start;
    const end = stamp.end;
    const timing = stamp.timing;

    data[name] = {
      elapsed,
      cycle,
      remainder,
      period,
      work,
      break: !work,
      timeout,
      duration,
      start,
      end,
      timing,
      timestamp,
      dayStart,
      text: format(stamp.timeout, input.format ?? "HH:mm:ss.SSS"),
    };

    return data;
  }, {} as GetPomoOutput);
}

export function json(input: GetPomoInput): Response {
  return Response.json(get(input));
}
