import type { Timing } from "../../mod.js";

export interface GetPomoInput {
  patterns: string;
  timestamp?: string;
  format?: string;
}

export interface GetPomoOutput {
  [key: string]: {
    elapsed: number;
    cycle: number;
    remainder: number;
    period: number;
    work: boolean;
    break: boolean;
    timeout: number;
    duration: number;
    start: number;
    end: number;
    timestamp: number;
    dayStart: number;
    text: string;
    timing: Timing;
  };
}
