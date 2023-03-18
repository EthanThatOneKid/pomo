import { format, PomoCollection } from "../../mod.ts";

import { GetPomoInput, GetPomoOutput } from "./types.ts";

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
  return Response.json(get(input), {
    headers: new Headers({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type",
    }),
  });
}
