/**
 * 帮助页
 */
import chalk from 'chalk'
import pkg from '../../package.json'
import { help as createHelp } from './create'
import { help as versionHelp } from './version'

const help = `
  Usage: sb-cli <command> <arg> [options]

  Options:
    -h, --help               查看帮助文档

  Commands:`


export default (argv: any) => {
  console.log(`
  @miapub/storybook-cli version：${chalk.magenta(pkg.version)}`)

  const helps = [
    help,
    createHelp,
    versionHelp
  ]

  console.log(helps.join(` `))
}