const Koa = require('koa')
const path = require('path')
const send = require('koa-send')
const body = require('koa-body')
const session = require('koa-session')
const logger = require('koa-logger')

const devRouter = require('./router/dev-router')
// const devRouterNoBundle = require('./router/dev-router-no-bundle')
const prodRouter = require('./router/prod-router')
const staticRouter = require('./router/static-router')
const apiRouter = require('./router/api-router')
const userRouter = require('./router/user-router')

const createDb = require('./db')
const config = require('../app.config')

const db = createDb(config.db.appId, config.db.appKey)

const app = new Koa()

app.keys = ['vue ssr koa']
app.use(session({
  key: 'vue-ssr-id',
  maxAge: 1000 * 60 * 60 * 24
}, app))

const isProd = process.env.NODE_ENV === 'production'

app.use(async (ctx, next) => {
  try {
    console.log(`request with path is ${ctx.path}`)
    await next()
  } catch (err) {
    console.log(err)
    ctx.status = 500
    if (isProd) {
      ctx.body = 'please try again later'
    } else {
      ctx.body = err.message
    }
  }
})

app.use(async (ctx, next) => {
  ctx.db = db
  await next()
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../')})
  } else {
    await next()
  }
})

app.use(body())
app.use(logger())

app.use(userRouter.routes()).use(userRouter.allowedMethods())
app.use(staticRouter.routes()).use(staticRouter.allowedMethods())
app.use(apiRouter.routes()).use(apiRouter.allowedMethods())

if (isProd) {
  app.use(prodRouter.routes()).use(prodRouter.allowedMethods())
} else {
  app.use(devRouter.routes()).use(devRouter.allowedMethods())
  // app.use(devRouterNoBundle.routes()).use(devRouterNoBundle.allowedMethods())
}

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8081

app.listen(PORT, HOST, () => {
  console.log(`Server started at ${HOST}:${PORT}`)
})
