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

  try {
    // 渲染上下文的 String
    const appString = await renderer.renderToString(context)

    // redirect
    const routerPath = context.router.currentRoute.fullPath
    if (routerPath !== ctx.path) {
      return ctx.redirect(routerPath)
    }

    // 获取 meta 信息
    const { title } = context.meta.inject()

    // 把渲染后的字符串手动注入到 ejs 模板中
    const html = ejs.render(template, {
      title: title.text(),
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts(),
      initialState: context.renderState()
    })

    ctx.body = html
  } catch (error) {
    console.log('render error: ', error.message)
    throw error
  }
}
