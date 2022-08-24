/**
 * 项目入口
 */

import minimist from 'minimist'
import fs from 'fs'
import path from 'path'
import program from 'commander'

module.exports = (argv: []) => {
  logo()
  // 解析所有【指令】及【参数】
  let curArgv = minimist(argv.slice(2));

  // 取出指令
  let commands = curArgv._

  // 对应读取 cli 文件夹里的文件（同步）
  let clis = fs.readdirSync(path.resolve(__dirname, './cli/')).map(c => c.replace('.js', ''))
  // 找不到指令时默认执行 help
  let cmd = clis.indexOf(commands[0]) !== -1 ? commands[0] : 'help'
  let command = require('./cli/' + cmd).default
  // 增加运行时的路径信息
  curArgv.cwd = process.cwd()

  command(argv)
}

function logo() {
  console.log(`
                              _                 _     
        _                    | |               | |    
    ___| |_  ___   ____ _   _| | _   ___   ___ | |  _ 
   /___)  _)/ _ \\ / ___) | | | || \\ / _ \\ / _ \\| | / )
  |___ | |_| |_| | |   | |_| | |_) ) |_| | |_| | |< ( 
  (___/ \\___)___/|_|    \\__  |____/ \\___/ \\___/|_| \\_)
                       (____/                                                                  
    `)
}

