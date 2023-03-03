import { format, PomoCollection } from "../../mod.ts";

export function formatMessage(
  collection: PomoCollection,
  name: string,
  period: number,
): string {
  const currentPeriodStatus = period % 2 === 0 ? "work" : "break";
  const nextPeriodStatus = period % 2 === 0 ? "break" : "work";
  const currentPeriodDuration = collection.data[name].cycle.periods[period];
  const nextPeriodDuration = collection.data[name].cycle
    .periods[collection.data[name].cycle.next(period)];
  return `🍅 <@&${name}> NOW: **${
    format(currentPeriodDuration, "HH:mm")
  }** ${currentPeriodStatus}; NEXT: **${
    format(nextPeriodDuration, "HH:mm")
  }** ${nextPeriodStatus} 🍅`;
}
