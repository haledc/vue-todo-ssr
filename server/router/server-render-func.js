const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
  ctx.headers['Content-Type'] = 'text/html'

  // 获得上下文
  // 通过session获得user的信息
  const context = {url: ctx.path, user: ctx.session.user}

  try {
    // 渲染上下文的String
    const appString = await renderer.renderToString(context)

    // rredirect
    const routerPath = context.router.currentRoute.fullPath
    if (routerPath !== ctx.path) {
      return ctx.redirect(routerPath)
    }

    const {title} = context.meta.inject()

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
