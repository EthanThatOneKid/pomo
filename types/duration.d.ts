/**
 * A duration in milliseconds.
 */
export type Duration = number;
/**
 * Format a duration in milliseconds to a string.
 */
export declare function format(duration: Duration, format: string): string;
export declare const MILLISECONDS_IN_SECOND = 1000;
export declare const SECONDS_IN_MINUTE = 60;
export declare const MINUTES_IN_HOUR = 60;
export declare const HOURS_IN_DAY = 24;
export declare const MILLISECOND: Duration;
export declare const SECOND: Duration;
export declare const MINUTE: Duration;
export declare const HOUR: Duration;
export declare const DAY: Duration;
