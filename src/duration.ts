/**
 * A duration in milliseconds.
 */
export type Duration = number;

/**
 * Format a duration in milliseconds to a string.
 */
export function format(duration: Duration, format: string) {
  let formatted = format;
  const info = infoOf(duration);

  for (const key in info) {
    const value = info[key as keyof ReturnType<typeof infoOf>];
    formatted = formatted.replace(key, pad(value, key.length));
  }

  return formatted;
}

function infoOf(duration: Duration) {
  return {
    HH: Math.floor(duration / HOUR) % HOURS_IN_DAY,
    mm: Math.floor(duration / MINUTE) % MINUTES_IN_HOUR,
    ss: Math.floor(duration / SECOND) % SECONDS_IN_MINUTE,
    SSS: duration % SECOND,
  };
}

function pad(n: number, size: number): string {
  return n.toString().padStart(size, "0");
}

export const MILLISECONDS_IN_SECOND = 1e3;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;

export const MILLISECOND: Duration = 1;
export const SECOND: Duration = MILLISECOND * MILLISECONDS_IN_SECOND;
export const MINUTE: Duration = SECOND * SECONDS_IN_MINUTE;
export const HOUR: Duration = MINUTE * MINUTES_IN_HOUR;
export const DAY: Duration = HOUR * HOURS_IN_DAY;
