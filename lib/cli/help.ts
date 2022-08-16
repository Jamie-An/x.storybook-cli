/**
 * 帮助页
 */
import chalk from 'chalk'
import pkg from '../../package.json'
import { help as initHelp } from './init'
import { help as versionHelp } from './version'

const help = `
Usage: sb <command> <arg> [options]

Options:1
  -V, --version            output the version number
  -h, --help               output usage information
  
Commands:`

export default (argv: any) => {
  console.log(`@miapub/storybook-cli version ${chalk.magenta(pkg.version)}`)

  const helps = [
    help,
    initHelp,
    versionHelp
  ]

  console.log(helps.join(` `))

  console.log('this is help', argv)
}