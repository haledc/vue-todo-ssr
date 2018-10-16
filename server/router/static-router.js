const Router = require('koa-router')
const send = require('koa-send')

// 指向打包生成的静态资源文件
const router = new Router({ prefix: '/client-dist' })

router.get('/*', async ctx => {
  await send(ctx, ctx.path)
})

module.exports = router
