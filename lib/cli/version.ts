/**
 * init 指令
 */

import chalk from 'chalk'
import pkg from '../../package.json'

export const help = `
  version                  查看工具的版本`

export default (argv: any) => {
  console.log(chalk.magenta(pkg.version))
}