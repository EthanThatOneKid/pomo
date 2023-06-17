/**
 * Format a duration in milliseconds to a string.
 */
export function format(duration, format) {
    let formatted = format;
    const info = infoOf(duration);
    for (const key in info) {
        const value = info[key];
        formatted = formatted.replace(key, pad(value, key.length));
    }
    return formatted;
}
function infoOf(duration) {
    return {
        HH: Math.floor(duration / HOUR) % HOURS_IN_DAY,
        mm: Math.floor(duration / MINUTE) % MINUTES_IN_HOUR,
        ss: Math.floor(duration / SECOND) % SECONDS_IN_MINUTE,
        SSS: duration % SECOND,
    };
}
function pad(n, size) {
    return n.toString().padStart(size, "0");
}
export const MILLISECONDS_IN_SECOND = 1e3;
export const SECONDS_IN_MINUTE = 60;
export const MINUTES_IN_HOUR = 60;
export const HOURS_IN_DAY = 24;
export const MILLISECOND = 1;
export const SECOND = MILLISECOND * MILLISECONDS_IN_SECOND;
export const MINUTE = SECOND * SECONDS_IN_MINUTE;
export const HOUR = MINUTE * MINUTES_IN_HOUR;
export const DAY = HOUR * HOURS_IN_DAY;
