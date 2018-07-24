const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const path = require('path')
const VueServerRenderer = require('vue-server-renderer')
const webpack = require('webpack')
const fs = require('fs')

const serverConfig = require('../../build/webpack.server.config')
const serverRender = require('./server-render-func')

const mfs = new MemoryFS()

// 打包server文件，生成compiler实例对象
const serverCompiler = webpack(serverConfig)
// 打包的输出文件保存到内存中
serverCompiler.outputFileSystem = mfs

let bundle

// 监听事件 类似webpack --watch
serverCompiler.watch(
  {/* 选项 */},
  (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.log(err))
    stats.warnings.forEach(() => console.warn(err))

    // 从内存中读取bundle
    const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log('new bundle generated')
  })

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = '正在生成bundle，请再等一会儿'
    return
  }

  // 从devServer中获取clientManifest， 通过axios获取
  const clientManifestResponse = await axios.get('http://127.0.0.1:8080/client-dist/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResponse.data

  // 从硬盘中读取template
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')

  // 生成renderer
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  // 渲染的具体方法(生产和开发环境共用)
  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router