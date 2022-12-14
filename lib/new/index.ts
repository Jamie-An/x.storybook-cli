/**
 * new 指令
 */

import path from "path"
import fs from 'fs-extra'
import ora from 'ora'
import download from 'download-git-repo'
import inquirer from 'inquirer'

interface IOption {
  css: 'less' | 'sass'
}

export default (argv: string[], name: string, distPath: string | undefined) => {
  // 开启loading
  const spinner = ora('').start()

  // 若传递了目标路径 => 与当前路径进行合并
  //      否        => 取当前路径
  const pathDir = path.resolve(process.cwd(), distPath ? distPath : '.')
  spinner.succeed(`项目存放地址: ${pathDir}`).start()

  // 包装一个函数同步处理模板仓库拉取
  const downLoadSync: (option: IOption) => Promise<void> = (option) => {
    spinner.text = 'loading...'
    // 更具参数匹配不同的仓库模板
    let gitHttp = {
      less: 'github:Jamie-An/sb-temp-react-less',
      sass: 'github:Jamie-An/sb-temp-react-sass',
    }
    return new Promise((resolve, reject) => {
      download(gitHttp[option.css], name, (err: any) => {
        if (err) {
          spinner.fail(`获取模板失败 T_T`)
          reject(err)
        }
        spinner.succeed(`获取模板成功！`)
        resolve()
      })
    })
  }
  // 增加选择项
  const promptList = [{
    type: 'rawlist',     // input, confirm, list, rawlist, expand, checkbox, password, editor
    message: '请选择搭配使用的CSS预编译器:',
    name: 'css',    // 存储当前问题回答的变量
    choices: [
      "Less",
      "Sass"
    ],
    filter: (val: string) => {   // 使用filter将回答变为小写
      return val.toLowerCase();
    }
  }]

  // 串联流程
  return inquirer
    .prompt(promptList)    // 选择类型
    .then(downLoadSync)    // 拉取模板
    .then(async () => {    // 迁移模板到指定目录
      if (distPath) {
        await fs.copy(`${process.cwd()}/${name}`, distPath)
        await fs.remove(`${process.cwd()}/${name}`)
      }
      spinner.succeed(`项目创建成功，可以开启组件库开发旅程拉!`)
      return Promise.resolve([
        `cd ${pathDir}`,
        'npm i                  安装所有依赖',
        'npm start              启动项目',
        'npm run build          打包组件库预览页',
        'npm run build-package  打包npm包'
      ])
    })
    .catch(() => {
      spinner.fail('创建失败')
      return Promise.reject(['创建项目失败，建议重新尝试！'])
    })
}