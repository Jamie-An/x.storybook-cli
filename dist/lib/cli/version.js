"use strict";
/**
 * init 指令
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const chalk_1 = __importDefault(require("chalk"));
const package_json_1 = __importDefault(require("../../package.json"));
exports.help = `
    version                  查看工具的版本`;
exports.default = (argv) => {
    console.log(chalk_1.default.magenta(package_json_1.default.version));
};
