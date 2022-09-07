"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 项目入口
 */
const package_json_1 = __importDefault(require("../package.json"));
const commander_1 = require("commander");
const new_1 = __importDefault(require("./new"));
const init_1 = __importDefault(require("./init"));
const chalk_1 = __importDefault(require("chalk"));
module.exports = (argv) => {
    const program = new commander_1.Command();
    let matched = false;
    program
        .version(package_json_1.default.version)
        .helpOption('-h, --help', '查看帮助文档')
        .usage('<command> <arg> [options]');
    program
        .argument('-l, --less', '搭配使用less(默认)')
        .argument('-sa, --sass', '搭配使用sass')
        .argument('<name>', '新创建项目的名称')
        .argument('[path]', '项目的存放目录');
    program
        .command('init')
        .alias('i')
        .description('在当前目录初始化项目')
        .option('-l, --less', '搭配使用less(默认)')
        .option('-sa, --sass', '搭配使用sass')
        .action((option = {}) => {
        matched = true;
        (0, init_1.default)(argv, (Object.keys(option)[0] || 'less'))
            .then((msg) => logMessage(msg))
            .catch((msg) => logMessage(msg));
    });
    program
        .command('new <name> [path]')
        .description('在指定目录初始化项目')
        .action((name, path) => {
        matched = true;
        (0, new_1.default)(argv, name, path)
            .then((msg) => logMessage(msg))
            .catch((msg) => logMessage(msg));
    });
    // 解析指令 
    program.parse(argv);
    // TODO: 此段逻辑未执行，待补充
    // @ts-ignore
    // if (matched !== true) {
    //   logo()
    //   program.help()
    // }
};
// 输出执行过程中的log
function logMessage(messages) {
    logo();
    console.log(messages.map(msg => '  ' + msg).join('\n') + '\n');
}
// 字符涂鸦
function logo() {
    console.log(chalk_1.default.magentaBright(`
                              _                 _     
        _                    | |               | |    
    ___| |_  ___   ____ _   _| | _   ___   ___ | |  _ 
   /___)  _)/ _ \\ / ___) | | | || \\ / _ \\ / _ \\| | / )
  |___ | |_| |_| | |   | |_| | |_) ) |_| | |_| | |< ( 
  (___/ \\___)___/|_|    \\__  |____/ \\___/ \\___/|_| \\_)
                       (____/                                                                  
    `));
}
