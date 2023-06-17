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
const duration_js_1 = require("./duration.js");
dntShim.Deno.test("format should format a duration of 0 milliseconds with the format 'HH:mm:ss.SSS'", () => {
    (0, dev_deps_js_1.assertEquals)((0, duration_js_1.format)(0, "HH:mm:ss.SSS"), "00:00:00.000");
});
dntShim.Deno.test("format should format a duration of 1 hour with the format 'HH:mm:ss.SSS'", () => {
    (0, dev_deps_js_1.assertEquals)((0, duration_js_1.format)(3600000, "HH:mm:ss.SSS"), "01:00:00.000");
});
dntShim.Deno.test("format should format a duration of 1 hour and 1 minute with the format 'HH:mm:ss.SSS'", () => {
    (0, dev_deps_js_1.assertEquals)((0, duration_js_1.format)(3660000, "HH:mm:ss.SSS"), "01:01:00.000");
});
dntShim.Deno.test("format should format a duration of 1 hour and 1 minute and 1 second with the format 'HH:mm:ss.SSS'", () => {
    (0, dev_deps_js_1.assertEquals)((0, duration_js_1.format)(3661000, "HH:mm:ss.SSS"), "01:01:01.000");
});
