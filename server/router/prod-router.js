const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render-func')

const router = new Router()

const handleSSR = async ctx => {
  // 获取bundle, clientManifest, template, 生产环境是可以直接从硬盘中获取build出来的文件
  const bundle = require('../../server-dist/vue-ssr-server-bundle')
  const clientManifest = require('../../client-dist/vue-ssr-client-manifest')

  // 生成renderer
  const renderer = VueServerRenderer.createBundleRenderer(
    bundle,
    {
      inject: false,
      clientManifest
    }
  )

  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  return serverRender(ctx, renderer, template)
}

router.get('*', handleSSR)

module.exports = router
