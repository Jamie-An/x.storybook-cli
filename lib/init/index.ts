/**
 * init 指令
 */

import path from "path"
import fs from 'fs-extra'
import ora from 'ora'
import download from 'download-git-repo'

type IOption = 'less' | 'sass' | 'stylus'

export default (argv: string[], option: IOption) => {
  // 开启loading
  const spinner = ora('').start()

  // 包装一个函数同步处理模板仓库拉取
  const downLoadSync: (option: IOption) => Promise<void> = (option) => {
    spinner.text = 'loading...'
    // 更具参数匹配不同的仓库模板
    let gitHttp = {
      less: 'github:Jamie-An/sb-temp-react-less',
      sass: 'github:Jamie-An/sb-temp-react-less',
      stylus: 'github:Jamie-An/sb-temp-react-less'
    }
    return new Promise((resolve, reject) => {
      download(gitHttp[option], '_temp', (err: any) => {
        if (err) {
          spinner.fail(`获取模板失败 T_T`)
          reject(err)
        }
        spinner.succeed(`获取模板成功！`)
        resolve()
      })
    })
  }

  return downLoadSync(option)
    .then(async () => {
      // 迁移模板到指定目录   
      await fs.copy(`${process.cwd()}/_temp`, process.cwd())
      await fs.remove(`${process.cwd()}/_temp`)
      spinner.succeed(`项目创建成功，可以开启您的组件库开发之旅拉!`)
      return Promise.resolve([
        'npm i                  安装所有依赖',
        'npm start              启动项目',
        'npm run build          打包组件库预览页',
        'npm run build-package  打包npm包'
      ])
    })
    .catch((err) => {
      // console.log(err)
      spinner.fail()
      return Promise.reject(['创建项目失败，建议重新尝试！'])
    })
}