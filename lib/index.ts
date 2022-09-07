/**
 * 项目入口
 */
import pkg from '../package.json'
import { Command } from 'commander'
import commandNew from './new'
import commandInit from './init'
import chalk from 'chalk'

type IOption = 'less' | 'sass'

module.exports = (argv: []) => {

  const program = new Command()
  let matched = false

  program
    .version(pkg.version)
    .helpOption('-h, --help', '查看帮助文档')
    .usage('<command> <arg> [options]')

  program
    .argument('-l, --less', '搭配使用less(默认)')
    .argument('-sa, --sass', '搭配使用sass')
    .argument('<name>', '新创建项目的名称')
    .argument('[path]', '项目的存放目录')

  program
    .command('init')
    .alias('i')
    .description('在当前目录初始化项目')
    .option('-l, --less', '搭配使用less(默认)')
    .option('-sa, --sass', '搭配使用sass')
    .action((option = {}) => {
      matched = true
      commandInit(argv, (Object.keys(option)[0] || 'less') as IOption)
        .then((msg: string[]) => logMessage(msg))
        .catch((msg: []) => logMessage(msg))
    })

  program
    .command('new <name> [path]')
    .description('在指定目录初始化项目')
    .action((name, path) => {
      matched = true
      commandNew(argv, name, path)
        .then((msg: string[]) => logMessage(msg))
        .catch((msg: []) => logMessage(msg))
    })

  // 解析指令 
  program.parse(argv)

  // TODO: 此段逻辑未执行，待补充
  // @ts-ignore
  // if (matched !== true) {
  //   logo()
  //   program.help()
  // }
}

// 输出执行过程中的log
function logMessage(messages: string[]) {
  logo()
  console.log(messages.map(msg => '  ' + msg).join('\n') + '\n')
}

// 字符涂鸦
function logo() {
  console.log(chalk.magentaBright(`
                              _                 _     
        _                    | |               | |    
    ___| |_  ___   ____ _   _| | _   ___   ___ | |  _ 
   /___)  _)/ _ \\ / ___) | | | || \\ / _ \\ / _ \\| | / )
  |___ | |_| |_| | |   | |_| | |_) ) |_| | |_| | |< ( 
  (___/ \\___)___/|_|    \\__  |____/ \\___/ \\___/|_| \\_)
                       (____/                                                                  
    `)
  )
}

