/**
 * 生产环境服务端渲染路由
 * @type {Router}
 */
const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const { createBundleRenderer } = require('vue-server-renderer')

const serverRender = require('./server-render-func')

const handleSSR = async ctx => {
  // 获取bundle, clientManifest, template
  // 生产环境是可以直接从硬盘中获取build出来的文件-clientManifest
  const bundle = require('../../server-dist/vue-ssr-server-bundle')
  const clientManifest = require('../../client-dist/vue-ssr-client-manifest')

  // 生成renderer
  const renderer = createBundleRenderer(
    bundle,
    {
      inject: false,
      clientManifest
    }
  )

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
