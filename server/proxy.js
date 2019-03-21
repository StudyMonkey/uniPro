const Koa = require('koa')
const Router = require('koa-router')
const c2k = require('koa2-connect')
const proxy = require('http-proxy-middleware')
const cors = require('koa2-cors');
const router = new Router()
const app = new Koa()
app.use(cors())
router.get('*',
  c2k(
    proxy({
      target: 'https://api.douban.com/v2/movie',
      changeOrigin: true,
      headers: {
        referer: 'https://www.douban.com',
        'Content-Type': ''
      }
    })
  )
)


app.use(router.routes())

app.listen(3002, () => {
  console.log(`Server started on 3002`)
})
