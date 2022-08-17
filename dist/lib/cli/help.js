"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 帮助页
 */
const chalk_1 = __importDefault(require("chalk"));
const package_json_1 = __importDefault(require("../../package.json"));
const create_1 = require("./create");
const version_1 = require("./version");
const help = `
  Usage: sb-cli <command> <arg> [options]

  Options:
    -h, --help               查看帮助文档

  Commands:`;
exports.default = (argv) => {
    console.log(`
  @miapub/storybook-cli version：${chalk_1.default.magenta(package_json_1.default.version)}`);
    const helps = [
        help,
        create_1.help,
        version_1.help
    ];
    console.log(helps.join(` `));
};
