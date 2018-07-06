const Router = require('koa-router')

const router = new Router({prefix: '/user'})

router.post('/login', async ctx => {
  const user = ctx.request.body

  if (user.username === 'hale' && user.password === '123') {
    ctx.session.user = {
      username: 'hale'
    }

    ctx.body = {
      success: true,
      data: {
        username: 'hale'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = router
