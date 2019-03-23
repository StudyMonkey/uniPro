<template>
	<div>
		<h2 class="castsName">{{casts.name}} {{casts.name_en}}</h2>
		<div class="castsImg">
			<img :src="casts.avatars.medium" alt="影人图片">
		</div>
		<h2 class="title">最受好评的5部作品：</h2>
		<div>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
				<div 
					v-for="(work,index) in casts.works"
					:key="work"
					class="scroll-view-item_H"				
				>
					<img :src="work.subject.images.medium" alt="电影图片">
					<p>{{work.subject.title}}</p>
				</div>
			</scroll-view>
		</div>		
	</div>
</template>

<script>
	import { get } from '@/utils/utils.js'
	export default{
		name: 'casts',
		data() {
			return {
				casts: ''
			}
		},
		async onLoad(option){
			console.log(option.id);
			const { data } = await get('/casts/detail', option.id);
			console.log('casts page', data);
			this.casts = data;
		},
		mounted(){
			console.log('casts page');
		},
		scroll: function(e) {
			console.log(e)
			this.old.scrollTop = e.detail.scrollTop
		},		
	}
</script>

<style scoped>
	.castsName{
		text-align: center;
	}
	.castsImg{
		width: 500upx;
		margin: 0 auto;
	}
	.castsImg img{
		width: 100%;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.scroll-view-item {
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
	}

	.scroll-view-item_H {
		width: 100%;
		height: 300upx;
		line-height: 300upx;
		text-align: center;
		font-size: 36upx;
		position: relative;
	}	
	.scroll-view_H img {
		width: 80%;
	}
	.scroll-view-item_H p{
		position: absolute;
		top: 0;
		text-align: center;
		left: 0;
		right: 0;
		font-size: 16px;
		color: #FFFFFF;
		background: rgba(0,0,0,.3);
		height: 40px;
		line-height: 40px;
	}
</style>
