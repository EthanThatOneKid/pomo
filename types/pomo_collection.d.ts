import type { PomoStamp, Timing } from "./pomo.js";
import { Pomo } from "./pomo.js";
export declare class PomoCollection<Key extends string = string> {
    readonly data: Record<Key, Pomo>;
    constructor(data?: Record<Key, Pomo>);
    at(n: number): Array<[Key, PomoStamp]>;
    timings(n: number): Array<[Key, Timing]>;
    static fromString(patterns: string, ref: number): PomoCollection;
}
