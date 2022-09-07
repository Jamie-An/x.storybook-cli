"use strict";
/**
 * new 指令
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
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const ora_1 = __importDefault(require("ora"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const inquirer_1 = __importDefault(require("inquirer"));
exports.default = (argv, name, distPath) => {
    // 开启loading
    const spinner = (0, ora_1.default)('').start();
    // 若传递了目标路径 => 与当前路径进行合并
    //      否        => 取当前路径
    const pathDir = path_1.default.resolve(process.cwd(), distPath ? distPath : '.');
    spinner.succeed(`项目存放地址: ${pathDir}`).start();
    // 包装一个函数同步处理模板仓库拉取
    const downLoadSync = (option) => {
        spinner.text = 'loading...';
        // 更具参数匹配不同的仓库模板
        let gitHttp = {
            less: 'github:Jamie-An/sb-temp-react-less',
            sass: 'github:Jamie-An/sb-temp-react-sass',
        };
        return new Promise((resolve, reject) => {
            (0, download_git_repo_1.default)(gitHttp[option.css], name, (err) => {
                if (err) {
                    spinner.fail(`获取模板失败 T_T`);
                    reject(err);
                }
                spinner.succeed(`获取模板成功！`);
                resolve();
            });
        });
    };
    // 增加选择项
    const promptList = [{
            type: 'rawlist',
            message: '请选择搭配使用的CSS预编译器:',
            name: 'css',
            choices: [
                "Less",
                "Sass"
            ],
            filter: (val) => {
                return val.toLowerCase();
            }
        }];
    // 串联流程
    return inquirer_1.default
        .prompt(promptList) // 选择类型
        .then(downLoadSync) // 拉取模板
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        if (distPath) {
            yield fs_extra_1.default.copy(`${process.cwd()}/${name}`, distPath);
            yield fs_extra_1.default.remove(`${process.cwd()}/${name}`);
        }
        spinner.succeed(`项目创建成功，可以开启组件库开发旅程拉!`);
        return Promise.resolve([
            `cd ${pathDir}`,
            'npm i                  安装所有依赖',
            'npm start              启动项目',
            'npm run build          打包组件库预览页',
            'npm run build-package  打包npm包'
        ]);
    }))
        .catch(() => {
        spinner.fail('创建失败');
        return Promise.reject(['创建项目失败，建议重新尝试！']);
    });
};
