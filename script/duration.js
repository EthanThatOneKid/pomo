"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DAY = exports.HOUR = exports.MINUTE = exports.SECOND = exports.MILLISECOND = exports.HOURS_IN_DAY = exports.MINUTES_IN_HOUR = exports.SECONDS_IN_MINUTE = exports.MILLISECONDS_IN_SECOND = exports.format = void 0;
/**
 * Format a duration in milliseconds to a string.
 */
function format(duration, format) {
    let formatted = format;
    const info = infoOf(duration);
    for (const key in info) {
        const value = info[key];
        formatted = formatted.replace(key, pad(value, key.length));
    }
    return formatted;
}
exports.format = format;
function infoOf(duration) {
    return {
        HH: Math.floor(duration / exports.HOUR) % exports.HOURS_IN_DAY,
        mm: Math.floor(duration / exports.MINUTE) % exports.MINUTES_IN_HOUR,
        ss: Math.floor(duration / exports.SECOND) % exports.SECONDS_IN_MINUTE,
        SSS: duration % exports.SECOND,
    };
}
function pad(n, size) {
    return n.toString().padStart(size, "0");
}
exports.MILLISECONDS_IN_SECOND = 1e3;
exports.SECONDS_IN_MINUTE = 60;
exports.MINUTES_IN_HOUR = 60;
exports.HOURS_IN_DAY = 24;
exports.MILLISECOND = 1;
exports.SECOND = exports.MILLISECOND * exports.MILLISECONDS_IN_SECOND;
exports.MINUTE = exports.SECOND * exports.SECONDS_IN_MINUTE;
exports.HOUR = exports.MINUTE * exports.MINUTES_IN_HOUR;
exports.DAY = exports.HOUR * exports.HOURS_IN_DAY;
