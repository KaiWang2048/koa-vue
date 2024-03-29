
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const KoaRouter = require('koa-router')()
const webpack = require('webpack')
const currentIP = require('ip').address()
const router = require('../server/routes/index')

const opn = require('opn')
const loggerMiddleware = require('koa-logger')()
const convert = require('koa-convert')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const appConfig = require('./../app.config')
const config = require('./webpack.config.dev')
const clientCompiler = webpack(config)

const proxyMiddleware = require('./utils/proxyMiddleWare')
const errorMiddleware = require('./utils/errorMiddleWare')
const spaMiddleWare = require('./utils/spaMiddleWare')
const staticMiddleWare = require('./utils/staticMiddleWare')
const cors = require('koa2-cors');

// 具体参数我们在后面进行解释


const app = new Koa()
const uri = 'http://' + currentIP + ':' + appConfig.appPort

const devMiddleware = webpackDevMiddleware(clientCompiler, {
  publicPath: config.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    modules: false,
  },
  noInfo: false,
})
app.use(cors({
  origin: function (ctx) {

    return "*";
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
// 中间件,一组async函数，generator函数需要convert转换
const middleWares = [
  // 打印请求与响应 日志
  loggerMiddleware,
  bodyParser(),
  // 压缩响应
  require('koa-compress')(),
  // 错误处理
  errorMiddleware,
  // 资源中间件
  staticMiddleWare(),
  // webpack开发中间件
  convert(devMiddleware),
  // webpack热替换中间件
  convert(webpackHotMiddleware(clientCompiler)),
  // spa单页应用处理,非api后段请求返回index.html
  spaMiddleWare(),
  // 路由
  router.middleware(),
  // 代理中间件
  proxyMiddleware(),
]

middleWares.forEach((middleware) => {
  if (!middleware) {
    return
  }
  app.use(middleware)
})

console.log('> Starting dev server...')

devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  opn(uri)
})

// 错误处理
app.on('error', (err) => {
  console.error('Server error: \n%s\n%s ', err.stack || '')
})

app.listen(appConfig.appPort)
