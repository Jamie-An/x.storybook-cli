/**
 * init 指令
 */

import path from "path"
import fs from 'fs-extra'
import chalk from 'chalk'
import ora from 'ora'
import inquirer from 'inquirer'

export const help = `
    create <name> <path>     初始化项目开发环境`

export default (argv: any) => {
  const download: any = require('download-git-repo')
  // 开启loading
  const spinner = ora('').start()
  // 1、获取命令参数
  const projectName = argv._[1]
  const cwd = argv.cwd
  const cacheArgPath = argv._[2]
  let distPath = cacheArgPath

  // 若传递了目标路径 => 与当前路径进行合并
  //      否        => 取当前路径
  if (distPath) {
    distPath = path.resolve(cwd, distPath)
  } else {
    distPath = cwd
  }
  spinner.succeed(`distPath: ${distPath}`).start()

  // 2、未输入项目名则报错
  if (!projectName) {
    console.log(chalk.white.bgRed(`Error: 请在init指令后输入项目名!`))
    spinner.stop()
    return
  }

  // 3、增加选择项
  const promptList = [{
    type: 'rawlist',     // input, confirm, list, rawlist, expand, checkbox, password, editor
    message: '请选择搭配使用的CSS预编译器:',
    name: 'css',    // 存储当前问题回答的变量
    choices: [
      "Less",
      "Sass",
      "Stylus"
    ],
    filter: (val: string) => {   // 使用filter将回答变为小写
      return val.toLowerCase();
    }
  }]

  // 包装一个函数同步处理模板仓库拉取
  interface IAnswers {
    css: 'less' | 'sass' | 'stylus'
  }
  const downLoadSync: (answers: IAnswers) => Promise<void> = (answers) => {
    // console.log(answers)
    spinner.text = 'loading...'
    const gitHttpOpt = {
      less: 'github:Jamie-An/storybook-templet',
      sass: 'github:Jamie-An/storybook-templet',
      stylus: 'github:Jamie-An/storybook-templet'
    }

    return new Promise((resolve, reject) => {
      download(gitHttpOpt[answers.css], projectName, (err: any) => {
        if (err) {
          spinner.fail(`获取模板失败`)
          reject(err)
        }
        spinner.succeed(`获取模板成功`).start()
        resolve()
      })
    })
  }

  // 4、串联流程
  inquirer
    .prompt(promptList)    // 选择类型
    .then(downLoadSync)    // 拉取模板
    .then(async () => {    // 迁移模板到指定目录
      if (cacheArgPath) {
        await fs.copy(`${cwd}/${projectName}`, distPath)
        await fs.remove(`${cwd}/${projectName}`)
      }
      spinner.succeed(`项目创建成功，可以开启组件库开发旅程拉！

    npm i                 // 安装所有依赖
    npm start             // 启动项目
    npm run build         // 打包组件库预览页
    npm run build-package // 打包npm包
      `)
    })
}