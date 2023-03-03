import { format, PomoCollection } from "../../mod.ts";

export function formatMessage(
  collection: PomoCollection,
  name: string,
  period: number,
): string {
  const currentPeriodStatus = period % 2 === 0 ? "work" : "break";
  const nextPeriodStatus = collection.data[name].cycle.next(period) % 2 === 0
    ? "work"
    : "break";
  const currentPeriodDuration = collection.data[name].cycle.periods[period];
  const nextPeriodDuration = collection.data[name].cycle
    .periods[collection.data[name].cycle.next(period)];
  return `🍅 <@&${name}> right now: **${
    format(currentPeriodDuration, "HH:mm")
  }** ${currentPeriodStatus}; next up: **${
    format(nextPeriodDuration, "HH:mm")
  }** ${nextPeriodStatus} 🍅`;
}
