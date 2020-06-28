const Router = require('@koa/router')
const devRouter = require('./dev-ssr-router')
const prodRouter = require('./prod-ssr-router')
const staticRouter = require('./static-router')
const apiRouter = require('./api-router')
const userRouter = require('./user-router')

const router = new Router()

module.exports = isProd => {
  router.use(staticRouter.routes()).use(staticRouter.allowedMethods())
  router.use(apiRouter.routes()).use(apiRouter.allowedMethods())
  router.use(userRouter.routes()).use(userRouter.allowedMethods())
  isProd
    ? router.use(prodRouter.routes()).use(prodRouter.allowedMethods())
    : router.use(devRouter.routes()).use(devRouter.allowedMethods())
  return router
}
