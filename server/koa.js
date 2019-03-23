const koa = require('koa');
const Router = require('koa-router');
const static = require('koa-static');
const bodyParser = require('koa-bodyparser');
const axios = require('axios');
const cors = require('koa2-cors');

// 链接数据库中间层
// const Monk = require('monk');
// const mongodb = Monk('localhost/uni-app');

// 读取user集合
// const movie = mongodb.get('movie_top_250');

const app = new koa();
const apikey = '0df993c66c0c636e29ecbb5344252a4a';
app.use(cors());
app.use(bodyParser());
const router = new Router();
app.use(static(__dirname+ '/'));
router.get('/demo', async ctx => {
    ctx.body = '<div>Hello World</div>'
})

/* 
 * 电影Top250接口
 * param 电影ID
 */
router.get('/movie/top250', async (ctx,next) => {
	const { param } = ctx.query;
	// console.log(start);

//     const data1 = await movie.find();
// 	console.log(data1);
//     ctx.body = data1
	
    const res = await axios.get('https://api.douban.com/v2/movie/top250?apikey='+ apikey +'&start='+ param +'&count=20');
    ctx.body = res.data;
	await next()
})

/* 
 * 电影详情接口
 * param 电影ID
 */
router.get('/movie/detail', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/subject/'+param);
    ctx.body = res.data;
	await next();
})

/* 
 * 电影短评接口
 * param 电影ID
 */
router.get('/movie/reviews', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/subject/'+ param +'/comments?count=20&apikey='+apikey);
    ctx.body = res.data;
	await next();
})

/* 
 * 演职员详情接口
 * param  演员ID
 */
router.get('/casts/detail', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/celebrity/'+param);
    ctx.body = res.data;
	await next();
})

/* 
 *  北美票房榜接口
 */
router.get('/movie/us_box', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/us_box?count=20&apikey='+apikey+'&start='+ param);
    ctx.body = res.data;
	await next();
})

/* 
 * 口碑周榜接口
 */
router.get('/movie/weekly', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/weekly?count=20&apikey='+apikey+'&start='+ param);
    ctx.body = res.data;
	await next();
})

/* 
 * 新片榜接口
 */
router.get('/movie/new_movies', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/new_movies?count=20&apikey='+apikey+'&start='+ param);
    ctx.body = res.data;
	await next();
})

/* 
 * 正在热映接口
 */
router.get('/movie/in_theaters', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/in_theaters?count=20&apikey='+apikey+'&start='+ param);
    ctx.body = res.data;
	await next();
})

/* 
 * 即将上映接口
 */
router.get('/movie/coming_soon', async (ctx,next) => {
	const { param } = ctx.query;
    const res = await axios.get('https://api.douban.com/v2/movie/coming_soon?count=20&apikey='+apikey+'&start='+ param);
    ctx.body = res.data;
	await next();
})

app.use(router.routes());


app.listen(3002, () => {
    console.log('开始监听3002端口');
})
