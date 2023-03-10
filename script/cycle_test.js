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
const cycle_js_1 = require("./cycle.js");
dntShim.Deno.test("cycle - at", () => {
    const c = new cycle_js_1.Cycle([10, 10, 10]);
    (0, dev_deps_js_1.assertEquals)(c.at(0), 0);
    (0, dev_deps_js_1.assertEquals)(c.at(5), 0);
    (0, dev_deps_js_1.assertEquals)(c.at(10), 1);
    (0, dev_deps_js_1.assertEquals)(c.at(15), 1);
    (0, dev_deps_js_1.assertEquals)(c.at(20), 2);
    (0, dev_deps_js_1.assertEquals)(c.at(25), 2);
    (0, dev_deps_js_1.assertEquals)(c.at(30), 0);
    (0, dev_deps_js_1.assertEquals)(c.at(35), 0);
    (0, dev_deps_js_1.assertEquals)(c.at(40), 1);
    (0, dev_deps_js_1.assertEquals)(c.at(45), 1);
});
dntShim.Deno.test("cycle - next", () => {
    const c = new cycle_js_1.Cycle([10, 10, 10]);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(0)), 1);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(5)), 1);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(10)), 2);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(15)), 2);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(20)), 0);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(25)), 0);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(30)), 1);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(35)), 1);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(40)), 2);
    (0, dev_deps_js_1.assertEquals)(c.next(c.at(45)), 2);
});
dntShim.Deno.test("cycle - next (negative count)", () => {
    const c = new cycle_js_1.Cycle([10, 10, 10]);
    (0, dev_deps_js_1.assertEquals)(c.next(0, -1), 2);
    (0, dev_deps_js_1.assertEquals)(c.next(1, -1), 0);
    (0, dev_deps_js_1.assertEquals)(c.next(2, -1), 1);
    (0, dev_deps_js_1.assertEquals)(c.next(0, -2), 1);
    (0, dev_deps_js_1.assertEquals)(c.next(1, -2), 2);
    (0, dev_deps_js_1.assertEquals)(c.next(2, -2), 0);
});
