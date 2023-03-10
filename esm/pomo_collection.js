import { Pomo } from "./pomo.js";
import { DAY, MINUTE } from "./duration.js";
export class PomoCollection {
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
                data[key] = Pomo.fromPattern({
                    pattern,
                    ref,
                    dayLength: DAY,
                    scale: MINUTE,
                });
            }
            return data;
        }, {}));
    }
}
