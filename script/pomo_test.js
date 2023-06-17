"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dntShim = __importStar(require("./_dnt.test_shims.js"));
const dev_deps_js_1 = require("./dev_deps.js");
const pomo_js_1 = require("./pomo.js");
const cycle_js_1 = require("./cycle.js");
const duration_js_1 = require("./duration.js");
const TEST_CYCLE = new cycle_js_1.Cycle([5, 5, 5, 5]);
const TEST_POMO = new pomo_js_1.Pomo(TEST_CYCLE, 100, 0);
dntShim.Deno.test("PomoStamp.work", () => {
    const stamp1 = TEST_POMO.at(1);
    const stamp2 = TEST_POMO.at(6);
    const stamp3 = TEST_POMO.at(11);
    const stamp4 = TEST_POMO.at(16);
    (0, dev_deps_js_1.assertEquals)(stamp1.work, true);
    (0, dev_deps_js_1.assertEquals)(stamp2.work, false);
    (0, dev_deps_js_1.assertEquals)(stamp3.work, true);
    (0, dev_deps_js_1.assertEquals)(stamp4.work, false);
});
dntShim.Deno.test("PomoStamp.timeout", () => {
    const stamp = TEST_POMO.at(1);
    (0, dev_deps_js_1.assertEquals)(stamp.timeout, 4);
});
dntShim.Deno.test("PomoStamp.timeout (2)", () => {
    const stamp = TEST_POMO.at(6);
    (0, dev_deps_js_1.assertEquals)(stamp.timeout, 4);
});
dntShim.Deno.test("PomoStamp.timeout (3)", () => {
    const stamp = TEST_POMO.at(11);
    (0, dev_deps_js_1.assertEquals)(stamp.timeout, 4);
});
dntShim.Deno.test("PomoStamp.duration", () => {
    const stamp = TEST_POMO.at(1);
    (0, dev_deps_js_1.assertEquals)(stamp.duration, 5);
});
dntShim.Deno.test("PomoStamp.start", () => {
    const stamp = TEST_POMO.at(101);
    (0, dev_deps_js_1.assertEquals)(stamp.start, 100);
});
dntShim.Deno.test("PomoStamp.end", () => {
    const stamp = TEST_POMO.at(104);
    (0, dev_deps_js_1.assertEquals)(stamp.end, 105);
});
dntShim.Deno.test("PomoStamp.end (2)", () => {
    const stamp = TEST_POMO.at(106);
    (0, dev_deps_js_1.assertEquals)(stamp.end, 110);
});
dntShim.Deno.test("PomoStamp.timing - returns correct values for first example", () => {
    const pomo = new pomo_js_1.Pomo(new cycle_js_1.Cycle([5, 10, 15]), 0, 0);
    const stamp = pomo.at(26);
    const expected = {
        periods: [
            { index: 0, timeout: 4 },
            { index: 1, timeout: 9 },
            { index: 2, timeout: 19 },
        ],
        interval: 30,
    };
    (0, dev_deps_js_1.assertEquals)(stamp.timing, expected);
});
dntShim.Deno.test("PomoStamp.timing - returns correct values for second example", () => {
    const pomo = new pomo_js_1.Pomo(new cycle_js_1.Cycle([5, 10, 15]), 0, 0);
    const stamp = pomo.at(33);
    const expected = {
        periods: [
            { index: 1, timeout: 2 },
            { index: 2, timeout: 12 },
            { index: 0, timeout: 27 },
        ],
        interval: 30,
    };
    (0, dev_deps_js_1.assertEquals)(stamp.timing, expected);
});
dntShim.Deno.test("Pomo.eternal", () => {
    (0, dev_deps_js_1.assertEquals)(TEST_POMO.eternal, true);
});
dntShim.Deno.test("Pomo.fromPattern", () => {
    const pomo = pomo_js_1.Pomo.fromPattern({
        pattern: "25w5b25w5b25w10b",
        dayLength: duration_js_1.DAY,
        ref: 0,
        scale: duration_js_1.MINUTE,
    });
    (0, dev_deps_js_1.assertEquals)(pomo.cycle.periods, [
        1500000,
        300000,
        1500000,
        300000,
        1500000,
        600000,
    ]);
});
