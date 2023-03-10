"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PomoCollection = void 0;
const pomo_js_1 = require("./pomo.js");
const duration_js_1 = require("./duration.js");
class PomoCollection {
    constructor(data = {}) {
        Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: data
        });
    }
    at(n) {
        return Object.entries(this.data).map(([key, pomo]) => [
            key,
            pomo.at(n),
        ]);
    }
    timings(n) {
        return this.at(n).map(([key, stamp]) => [key, stamp.timing]);
    }
    static fromString(patterns, ref) {
        return new PomoCollection(patterns
            .split(";")
            .reduce((data, pair) => {
            const { 0: key, 1: pattern } = pair.split(":").map((s) => s.trim());
            if (key !== undefined && pattern !== undefined) {
                data[key] = pomo_js_1.Pomo.fromPattern({
                    pattern,
                    ref,
                    dayLength: duration_js_1.DAY,
                    scale: duration_js_1.MINUTE,
                });
            }
            return data;
        }, {}));
    }
}
exports.PomoCollection = PomoCollection;
