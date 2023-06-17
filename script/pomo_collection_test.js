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
const pomo_collection_js_1 = require("./pomo_collection.js");
const duration_js_1 = require("./duration.js");
dntShim.Deno.test("PomoCollection.fromString returns correct PomoCollection", () => {
    const collection = pomo_collection_js_1.PomoCollection.fromString("25-5:25w5b;50-10:50w10b", 0);
    (0, dev_deps_js_1.assertEquals)(Object.values(collection.data).length, 2);
    (0, dev_deps_js_1.assertEquals)(collection.data["25-5"].cycle.periods, [25 * duration_js_1.MINUTE, 5 * duration_js_1.MINUTE]);
    (0, dev_deps_js_1.assertEquals)(collection.data["50-10"].cycle.periods, [50 * duration_js_1.MINUTE, 10 * duration_js_1.MINUTE]);
});
dntShim.Deno.test("PomoCollection returns correct timings", () => {
    const REF = 0;
    const collection = pomo_collection_js_1.PomoCollection.fromString("25-5:25w5b;50-10:50w10b", REF);
    const timings = collection.timings(30 * duration_js_1.MINUTE + REF);
    (0, dev_deps_js_1.assertEquals)(timings, [
        ["25-5", {
                periods: [
                    { index: 1, timeout: 25 * duration_js_1.MINUTE },
                    { index: 0, timeout: 30 * duration_js_1.MINUTE },
                ],
                interval: 30 * duration_js_1.MINUTE,
            }],
        ["50-10", {
                periods: [
                    { index: 1, timeout: 20 * duration_js_1.MINUTE },
                    { index: 0, timeout: 30 * duration_js_1.MINUTE },
                ],
                interval: 60 * duration_js_1.MINUTE,
            }],
    ]);
});
