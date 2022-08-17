"use strict";
/**
 * 项目入口
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimist_1 = __importDefault(require("minimist"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// 解析所有【指令】及【参数】
let argv = (0, minimist_1.default)(process.argv.slice(2));
// 取出指令
let commands = argv._;
// 对应读取 cli 文件夹里的文件（同步）
let clis = fs_1.default.readdirSync(path_1.default.resolve(__dirname, './cli/')).map(c => c.replace('.js', ''));
// 找不到指令时默认执行 help
let cmd = clis.indexOf(commands[0]) !== -1 ? commands[0] : 'help';
let command = require('./cli/' + cmd).default;
// 增加运行时的路径信息
argv.cwd = process.cwd();
command(argv);
