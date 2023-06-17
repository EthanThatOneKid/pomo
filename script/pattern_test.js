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
const pattern_js_1 = require("./pattern.js");
dntShim.Deno.test("parsePattern should parse the pattern string and return an array of numbers", () => {
    const pattern = "25w5b25w5b25w25b10";
    const scale = 1;
    const expected = [25, 5, 25, 5, 25, 25, 10];
    const result = (0, pattern_js_1.parsePattern)(pattern, scale);
    (0, dev_deps_js_1.assertEquals)(result, expected);
});
dntShim.Deno.test("parsePattern should handle non-digit characters", () => {
    const pattern = "25w-5b 25w,5b25w25b10";
    const scale = 1;
    const expected = [25, 5, 25, 5, 25, 25, 10];
    const result = (0, pattern_js_1.parsePattern)(pattern, scale);
    (0, dev_deps_js_1.assertEquals)(result, expected);
});
dntShim.Deno.test("parsePattern should handle a scale factor", () => {
    const pattern = "25w5b25w5b25w25b10";
    const scale = 2;
    const expected = [50, 10, 50, 10, 50, 50, 20];
    const result = (0, pattern_js_1.parsePattern)(pattern, scale);
    (0, dev_deps_js_1.assertEquals)(result, expected);
});
dntShim.Deno.test("parsePattern should return an empty array if pattern is empty", () => {
    (0, dev_deps_js_1.assertEquals)((0, pattern_js_1.parsePattern)("", 1), []);
});
