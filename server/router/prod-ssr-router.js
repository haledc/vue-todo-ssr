/**
 * 生产环境服务端渲染路由
 */
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')

const serverRender = require('./ssr-render')

const handleSSR = async ctx => {
  // 生产环境是可以直接从硬盘中获取打包后的 bundle clientManifest
  const bundle = require('../../dist-server/vue-ssr-server-bundle')
  const clientManifest = require('../../dist-client/vue-ssr-client-manifest')

  // 生成 renderer
  const renderer = createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  // 读取 template
  const template = fs.readFileSync(
    path.join(__dirname, '../ssr.template.ejs'),
    'utf-8'
  )

  // 渲染成字符串
  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
