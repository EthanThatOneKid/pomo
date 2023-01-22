/**
 * Format a duration in milliseconds to a string.
 */
export function format(duration: number, format: string) {
  let formatted = format;
  const info = infoOf(duration);

  for (const key in info) {
    const value = info[key as keyof ReturnType<typeof infoOf>];
    formatted = formatted.replace(key, pad(value, key.length));
  }

  return formatted;
}

function infoOf(duration: number) {
  return {
    HH: Math.floor(duration / HOUR) % 24,
    mm: Math.floor(duration / MINUTE) % 60,
    ss: Math.floor(duration / SECOND) % 60,
    SSS: duration % SECOND,
  };
}

function pad(n: number, size: number): string {
  return n.toString().padStart(size, "0");
}

const SECOND = 1e3;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
