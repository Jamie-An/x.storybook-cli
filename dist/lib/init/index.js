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
const fs_extra_1 = __importDefault(require("fs-extra"));
const ora_1 = __importDefault(require("ora"));
const download_git_repo_1 = __importDefault(require("download-git-repo"));
exports.default = (argv, option) => {
    // 开启loading
    const spinner = (0, ora_1.default)('').start();
    // 包装一个函数同步处理模板仓库拉取
    const downLoadSync = (option) => {
        spinner.text = 'loading...';
        // 更具参数匹配不同的仓库模板
        let gitHttp = {
            less: 'github:Jamie-An/storybook-templet',
            sass: 'github:Jamie-An/storybook-templet',
            stylus: 'github:Jamie-An/storybook-templet'
        };
        return new Promise((resolve, reject) => {
            (0, download_git_repo_1.default)(gitHttp[option], '_temp', (err) => {
                if (err) {
                    spinner.fail(`获取模板失败 T_T`);
                    reject(err);
                }
                spinner.succeed(`获取模板成功！`);
                resolve();
            });
        });
    };
    return downLoadSync(option)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        // 迁移模板到指定目录   
        yield fs_extra_1.default.copy(`${process.cwd()}/_temp`, process.cwd());
        yield fs_extra_1.default.remove(`${process.cwd()}/_temp`);
        spinner.succeed(`项目创建成功，可以开启您的组件库开发之旅拉!`);
        return Promise.resolve([
            'npm i                  安装所有依赖',
            'npm start              启动项目',
            'npm run build          打包组件库预览页',
            'npm run build-package  打包npm包'
        ]);
    }))
        .catch((err) => {
        // console.log(err)
        spinner.fail();
        return Promise.reject(['创建项目失败，建议重新尝试！']);
    });
};
