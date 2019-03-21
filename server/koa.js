const koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');
const cors = require('koa-cors');

// 链接数据库中间层
const Monk = require('monk');
const mongodb = Monk('localhost/uni-app');

// 读取user集合
const movie = mongodb.get('movie_top_250');

const app = new koa();
const apikey = '0df993c66c0c636e29ecbb5344252a4a';
app.use(cors());
app.use(bodyParser());
const router = new Router();
app.use(static(__dirname+ '/'));
router.get('/demo', async ctx => {
    ctx.body = '<div>Hello World</div>'
})
router.get('/api/movie', async ctx => {
	const { start } = ctx.query;
	// console.log(start);

//     const data1 = await movie.find();
// 	console.log(data1);
//     ctx.body = data1
	
    const res = await axios.get('https://douban.uieee.com/v2/movie/top250?apikey='+ apikey +'&start='+ start +'&count=12');
    console.log('res', res);
    ctx.body = res.data;
})

app.use(router.routes());


app.listen(4000, () => {
    console.log('开始监听4000端口');
})
