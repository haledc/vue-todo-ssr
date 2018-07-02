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

const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(() => console.warn(err))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async ctx => {
  if (!bundle) {
    ctx.body = '正在生成bundle，请再等一会儿'
    return
  }

  const clientManifestResponse = await axios.get('http://127.0.0.1:8080/vue-ssr-client-manifest.json')
  const clientManifest = clientManifestResponse.data
  const template = fs.readFileSync(path.join(__dirname, '../server.template.ejs'), 'utf-8')
  const renderer = VueServerRenderer.createBundleRenderer(bundle, {
    inject: false,
    clientManifest
  })

  await serverRender(ctx, renderer, template)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
