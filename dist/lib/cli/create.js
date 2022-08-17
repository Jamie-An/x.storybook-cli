"use strict";
/**
 * init 指令
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
const inquirer_1 = __importDefault(require("inquirer"));
exports.help = `
    create <name> <path>     初始化项目开发环境`;
exports.default = (argv) => {
    const download = require('download-git-repo');
    // 开启loading
    const spinner = (0, ora_1.default)('').start();
    // 1、获取命令参数
    const projectName = argv._[1];
    const cwd = argv.cwd;
    const cacheArgPath = argv._[2];
    let distPath = cacheArgPath;
    // 若传递了目标路径 => 与当前路径进行合并
    //      否        => 取当前路径
    if (distPath) {
        distPath = path_1.default.resolve(cwd, distPath);
    }
    else {
        distPath = cwd;
    }
    spinner.succeed(`distPath: ${distPath}`).start();
    // 2、未输入项目名则报错
    if (!projectName) {
        console.log(chalk_1.default.white.bgRed(`Error: 请在init指令后输入项目名!`));
        spinner.stop();
        return;
    }
    // 3、增加选择项
    const promptList = [{
            type: 'rawlist',
            message: '请选择搭配使用的CSS预编译器:',
            name: 'css',
            choices: [
                "Less",
                "Sass",
                "Stylus"
            ],
            filter: (val) => {
                return val.toLowerCase();
            }
        }];
    const downLoadSync = (answers) => {
        // console.log(answers)
        spinner.text = 'loading...';
        const gitHttpOpt = {
            less: 'github:Jamie-An/storybook-templet',
            sass: 'github:Jamie-An/storybook-templet',
            stylus: 'github:Jamie-An/storybook-templet'
        };
        return new Promise((resolve, reject) => {
            download(gitHttpOpt[answers.css], projectName, (err) => {
                if (err) {
                    spinner.fail(`获取模板失败`);
                    reject(err);
                }
                spinner.succeed(`获取模板成功`).start();
                resolve();
            });
        });
    };
    // 4、串联流程
    inquirer_1.default
        .prompt(promptList) // 选择类型
        .then(downLoadSync) // 拉取模板
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        if (cacheArgPath) {
            yield fs_extra_1.default.copy(`${cwd}/${projectName}`, distPath);
            yield fs_extra_1.default.remove(`${cwd}/${projectName}`);
        }
        spinner.succeed(`项目创建成功，可以开启组件库开发旅程拉！

    npm i                 // 安装所有依赖
    npm start             // 启动项目
    npm run build         // 打包组件库预览页
    npm run build-package // 打包npm包
      `);
    }));
};
