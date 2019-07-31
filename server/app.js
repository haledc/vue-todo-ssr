const Koa = require('koa')
const path = require('path')
const send = require('koa-send')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const logger = require('koa-logger')
const createRouters = require('./router')
const createDb = require('./db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)
const isProd = process.env.NODE_ENV === 'production'

const app = new Koa()
const routers = createRouters(isProd)

app.keys = ['vue ssr koa']
app.use(
  session(
    {
      key: 'vue-ssr-id',
      maxAge: 1000 * 60 * 60 * 24
    },
    app
  )
)

app.use(async (ctx, next) => {
  try {
    console.log(`request with path is ${ctx.path}`)
    await next()
  } catch (error) {
    console.log(error)
    ctx.status = 500
    if (isProd) {
      ctx.body = 'please try again later'
    } else {
      ctx.body = error.message
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(bodyParser())
app.use(logger())
app.use(routers.routes()).use(routers.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8081

app.listen(PORT, HOST, () => {
  console.log(`Server started at ${HOST}:${PORT}`)
})
