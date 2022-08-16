/**
 * init 指令
 */

export const help = `  
  init [projectName]       初始化项目开发环境`

export default (argv: any) => {
  console.log('this is init!', argv)
}