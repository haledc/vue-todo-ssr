/**
 * 开发环境服务端渲染路由
 */
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const path = require('path')
const { createBundleRenderer } = require('vue-server-renderer')
const webpack = require('webpack')
const fs = require('fs')

const serverConfig = require('../../build/webpack.server.config')
const serverRender = require('./ssr-render')

// 生成 mfs 对象
const mfs = new MemoryFS()

// 打包 server 文件，生成 compiler 实例对象
const serverCompiler = webpack(serverConfig)

// 打包的输出文件保存到内存中
serverCompiler.outputFileSystem = mfs

// vue-ssr-server-bundle.json
let bundle

// 监听事件 类似 webpack --watch
// 主要是从内存中拿到 bundle
serverCompiler.watch(
  {
    /* 选项 */
  },
  (error, stats) => {
    if (error) throw error
    stats = stats.toJson()
    stats.errors.forEach(error => console.log(error))
    stats.warnings.forEach(() => console.warn(error))

    // 从内存中读取 bundle
    const bundlePath = path.join(
      serverConfig.output.path,
      'vue-ssr-server-bundle.json'
    )
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log('new bundle generated')
  }
)

// 处理 SSR 方法
const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = '正在生成bundle，请再等一会儿！'
    return
  }

  // 从 devServer 中获取 clientManifest
  const clientManifestResponse = await axios.get(
    'http://127.0.0.1:8080/dist-client/vue-ssr-client-manifest.json'
  )
  const clientManifest = clientManifestResponse.data

  // 从硬盘中读取 template
  const template = fs.readFileSync(
    path.join(__dirname, '../ssr.template.ejs'),
    'utf-8'
  )

  // 生成 renderer
  const renderer = createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  // 渲染成字符串的方法 (生产和开发环境共用)
  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
