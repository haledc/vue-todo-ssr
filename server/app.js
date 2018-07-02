const Koa = require('koa')
const path = require('path')
const send = require('koa-send')
const bodyParser = require('koa-bodyparser')

const devRouter = require('./router/dev-router')

const app = new Koa()

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
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', {root: path.join(__dirname, '../static')})
  } else {
    await next()
  }
})

app.use(bodyParser())

app.use(devRouter.routes()).use(devRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8888

app.listen(PORT, HOST, () => {
  console.log(`Server started at ${HOST}:${PORT}`)
})
