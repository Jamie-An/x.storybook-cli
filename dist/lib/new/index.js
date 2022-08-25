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
exports.default = (argv, name, distPath, option) => {
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
            less: 'github:Jamie-An/storybook-templet',
            sass: 'github:Jamie-An/storybook-templet',
            stylus: 'github:Jamie-An/storybook-templet'
        };
        return new Promise((resolve, reject) => {
            (0, download_git_repo_1.default)(gitHttp[option], name, (err) => {
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
        if (distPath) {
            yield fs_extra_1.default.copy(`${process.cwd()}/${name}`, distPath);
            yield fs_extra_1.default.remove(`${process.cwd()}/${name}`);
        }
        spinner.succeed(`项目创建成功，可以开启您的组件库开发之旅拉!`);
        return Promise.resolve([
            `cd ${pathDir}`,
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
    // 备选：增加选择项
    // const promptList = [{
    //   type: 'rawlist',     // input, confirm, list, rawlist, expand, checkbox, password, editor
    //   message: '请选择搭配使用的CSS预编译器:',
    //   name: 'css',    // 存储当前问题回答的变量
    //   choices: [
    //     "Less",
    //     "Sass",
    //     "Stylus"
    //   ],
    //   filter: (val: string) => {   // 使用filter将回答变为小写
    //     return val.toLowerCase();
    //   }
    // }]
    // // 备选：串联流程
    // return inquirer
    //   .prompt(promptList)    // 选择类型
    //   .then(downLoadSync)    // 拉取模板
    //   .then(async () => {    // 迁移模板到指定目录
    //     if (distPath) {
    //       await fs.copy(`${process.cwd()}/${name}`, distPath)
    //       await fs.remove(`${process.cwd()}/${name}`)
    //     }
    //     spinner.succeed(`项目创建成功，可以开启组件库开发旅程拉!`)
    //     return Promise.resolve([
    //       '项目创建成功，可以开启组件库开发旅程拉！',
    //       'npm i                 // 安装所有依赖',
    //       'npm start             // 启动项目',
    //       'npm run build         // 打包组件库预览页',
    //       'npm run build-package // 打包npm包'
    //     ])
    //   })
    //   .catch(() => {
    //     return Promise.reject(['创建项目失败，建议重新尝试！'])
    //   })
};
