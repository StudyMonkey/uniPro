<template>
	<div>
		<div class="bgMovieImg">
			<img class="movieImg" :src="detail.images.medium" alt="电影图片">			
		</div>	
		<div class="title">演职员列表</div>
		<div class="uni-list">
			<div 
				class="uni-list-cell" 
				hover-class="uni-list-cell-hover" 
				v-for="(value,key) in detail.casts" 
				:key="key"
			>
				<div class="uni-media-list">
					<div class="uni-media-list-logo">
						<image :src="value.avatars.medium" @click="handlePreview(value)"></image>
					</div>
					<div class="uni-media-list-body" @click="handleCastsDetail(value)">
						<div class="uni-media-list-text-top">{{value.name}}</div>
						<div class="uni-media-list-text-bottom uni-ellipsis">查看详情</div>
					</div>
				</div>
			</div>
		</div>
		<div>
			<div class="title">{{detail.title}}的剧情简介</div>
			<p class="summaryWrap">{{detail.summary}}</p>
		</div>
		<div>
			<div class="title">{{detail.title}}的评价</div>
			<div class="uni-list">
				<block v-for="(item,index) in reviewList" :key="index">
					<div class="uni-list-cell" hover-class="uni-list-cell-hover">
						<div class="uni-triplex-row">
							<div class="uni-triplex-left">
								<text class="uni-title uni-ellipsis">{{item.author.name}} - 发表于{{item.created_at}}</text>
								<text class="uni-text">{{item.useful_count}}人觉得有用</text>
								<text class="uni-text-small uni-ellipsis">{{item.content}}</text>
							</div>
						</div>
					</div>
				</block>
			</div>			
		</div>
		
	</div>
</template>

<script>
	import { get } from '@/utils/utils'
	export default{
		name: 'detail',
		data() {
			return {
				detail: '',
				reviewList: []
			}
		},
		async onLoad(option){
			console.log(option.id);
			// 电影详情数据请求，传入电影ID
			const { data } = await get('/movie/detail', option.id);
			this.detail = data;
			uni.setNavigationBarTitle({
				title: this.detail.title
			})
			// 电影评价数据请求，传入电影ID
			const { data: { comments } } = await get('/movie/reviews', option.id);
			this.reviewList = comments;
		},
		mounted(){
			console.log(111);
		},
		methods: {
			handleCastsDetail(item) {
				uni.navigateTo({
					url: '/pages/casts/casts?id='+item.id
				})
			},
			// 点击图片预览大图事件处理
			handlePreview(item){
				console.log('preview image');
			  uni.previewImage({
				current: item.avatars.medium,
				urls: [item.avatars.medium]
			  })
			}			
		},
	}
</script>

<style scoped>
	.bgMovieImg{
		width: 500upx;
		margin: 0 auto;
	}
	.bgMovieImg img{
		width: 100%;
	}
	.title{
		font-size: 14px;
		padding-left: 8px;
	}
	.summaryWrap{
		padding: 0 5px;
		text-indent: 20px;
		background: #FFFFFF;
	}
	.uni-triplex-left{
		width: 98%;
	}
</style>
