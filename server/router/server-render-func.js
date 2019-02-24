/**
 * 服务端渲染方法
 */
const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  // 返回内容类型
  ctx.headers['Content-Type'] = 'text/html'

  // 获得上下文
  // 通过 session 获得 user 的信息
  const context = { url: ctx.path, user: ctx.session.user }
  // console.log('----------------', context)

  try {
    // 渲染上下文的String
    const appString = await renderer.renderToString(context)
    // console.log('appString------------', appString)

    // redirect
    const routerPath = context.router.currentRoute.fullPath
    if (routerPath !== ctx.path) {
      return ctx.redirect(routerPath)
    }

    // 获取meta信息
    const { title } = context.meta.inject()

    // 把渲染后的代码手动注入到ejs模板中完成展示
    const html = ejs.render(template, {
      title: title.text(),
      // 渲染后的字符串
      appString,
      // 渲染后的样式
      style: context.renderStyles(),
      // 渲染后的模板
      scripts: context.renderScripts(),
      // 渲染后的数据
      initialState: context.renderState()
    })

    ctx.body = html
  } catch (err) {
    console.log('render error: ', err.message)
    throw err
  }
}
