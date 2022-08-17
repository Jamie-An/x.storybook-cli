/**
 * 项目入口
 */

import minimist from 'minimist'
import fs from 'fs'
import path from 'path'

// 解析所有【指令】及【参数】
let argv = minimist(process.argv.slice(2));

// 取出指令
let commands = argv._

// 对应读取 cli 文件夹里的文件（同步）
let clis = fs.readdirSync(path.resolve(__dirname, './cli/')).map(c => c.replace('.js', ''))
// 找不到指令时默认执行 help
let cmd = clis.indexOf(commands[0]) !== -1 ? commands[0] : 'help'
let command = require('./cli/' + cmd).default
// 增加运行时的路径信息
argv.cwd = process.cwd()

command(argv)



