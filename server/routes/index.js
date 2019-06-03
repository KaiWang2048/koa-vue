const Router = require('koa-router')
const router = new Router()
const Mysql = require('../database/index')
const jwtKoa = require('koa-jwt')
const jwt = require('jsonwebtoken')
const util = require('util')
const verify = util.promisify(jwt.verify)
const Koa = require('koa')
const app = new Koa()

const jwtSecret = 'jwtSecret'
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7
app.use(jwtKoa({
  jwtSecret
}).unless({
  path: [/^\/api\/login/]
}))

router.post('/api/login', async (ctx, next) => {
  const user = ctx.request.body
  if (user && user.username) {
    let userToken = {
      username: user.username
    }
    const token = jwt.sign(userToken, jwtSecret, {
      expiresIn: tokenExpiresTime
    }) //token签名 有效期为1小时
    ctx.body = {
      message: '获取token成功',
      code: 1,
      token
    }
  } else {
    ctx.body = {
      message: '参数错误',
      code: -1
    }
  }
})
router.post('/api/save', async (ctx, next) => {
  let mysql = new Mysql(ctx.request.body)
  let data = await mysql.add()
  ctx.response.status = 200
  ctx.response.body = {
    "code": 1,
    "data": data,
  }
})
router.get('/api/home', async (ctx, next) => {
  let mysql = new Mysql(ctx.request)
  let data = await mysql.query()
  ctx.response.status = 200
  ctx.response.body = {
    "code": 1,
    "data": data,
    "mesg": 'ok'
  }
})
router.post('/api/save', async (ctx, next) => {
  let mysql = new Mysql(ctx.request.body)
  let data = await mysql.add()
  ctx.response.status = 200
  ctx.response.body = {
    "code": 1,
    "data": data,
  }
})
router.get('/api/detail', async (ctx) => {
  console.log(ctx.header)
  const token = ctx.header.authorization // 获取jwt
  let payload
  if (token) {
    payload = await verify(token, jwtSecret) // // 解密，获取payload
    ctx.body = {
      payload
    }
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'token 错误',
      code: -1
    }
  }
})

module.exports = router
