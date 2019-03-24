<template>
	<div>
<!-- 		<div 
			class="uni-flex uni-row" 
			style="justify-content: center;"
			v-for="(list,ind) in newArray"
			:key="ind"
		>
			<uni-card 
				style="width: 40%;"			
				v-for="(movie,index) in list" 
				:key="index"
				:title="movie.title" 
				:thumbnail="movie.images.medium" 
				:note="movie.directors[0].name">
			</uni-card>
		</div> -->
		<div class="uni-product-list">
			<div 
				class="uni-product" 
				v-for="(movie,index) in movieList" 
				:key="index"
				@click="handleDetailClick(movie)"
			>
				<div class="image-view">
					<image 
						v-if="renderImage" 
						class="uni-product-image" 
						:src="[ isSubject ? movie.subject.images.medium : movie.images.medium]"
					></image>
				</div>	
				<div class="uni-product-title" v-text="isSubject ? movie.subject.title : movie.title"></div>
				<div>
					<uni-rate class="fl" size="12" disabled="true" :value="[ isSubject ? movie.subject.rating.average : movie.rating.average]"></uni-rate>
					<span class="fr" v-text="isSubject ? movie.subject.rating.average : movie.rating.average+'分'"></span>
				</div>			
			</div>
			<p class="bottomP" v-if="!more">----------无更多精彩内容-----------</p>
		</div>		
	</div>
</template>

<script>
	import { get,getType } from '../../utils/utils.js'
	// import { getMovie } from '../../utils/api.js'
	import uniCard from '@/components/uni-card/uni-card.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	export default{
		name: 'movie',
		data() {
			return {
				renderImage: false,
				movieList: [],
				page: 0,
				more: true,
				type: ''
			}
		},
		onLoad(option){
			console.log(option.type);
			this.type = option.type;
		},
		computed:{
			newArray(){
				let result = [];
				for(var i=0;i<this.movieList.length;i+=2){
					result.push(this.movieList.slice(i,i+2));
				}
				console.log(result);
				return result;
			},
			isSubject(){
				console.log('computed 判断', this.type === '/movie/weekly' || this.type === '/movie/us_box');
				return this.type === '/movie/weekly' || this.type === '/movie/us_box'
			}
		},
		components: {
			uniCard,
			uniRate
		},
		methods: {
			async getList(init){
				if ( this.more ) {
					if ( init ) {
						this.page = 0
						const { data: { subjects } } = await get(this.type, this.page);
						if ( subjects.length < 20 ) {
							this.more = false
						}						
						this.movieList = subjects;
						console.log(this.movieList);
					} else {
						this.page += 20
						const { data: { subjects } } = await get(this.type, this.page);
						if ( subjects.length < 20 ) {
							this.more = false
						}
						this.movieList = this.movieList.concat(subjects);
					}
					this.renderImage = true					
				} else {
					return false
				}

// 				const { subjects } = await getMovie();
// 				console.log('movie vue', subjects);
// 				this.movieList = subjects;
			},
			handleDetailClick(item) {
				let id;
				if ( this.type === '/movie/weekly' || this.type === '/movie/us_box' ) {
					id = item.subject.id
				} else {
					id = item.id
				}
				uni.navigateTo({
					url: '/pages/detail/detail?id='+id
				})
			}						
		},
		created() {
			console.log('movie created');
			this.getList(true)			
			
			console.log('movieList', this.movieList);
		},
		onReachBottom(){
			console.log('1111');
			console.log(this.page);
			this.getList(false)	
					
		}
	}
</script>

<style scoped>
	.uni-product-title{
		font-size: 16px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.bottomP{
		width: 100%;
		text-align: center;
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
</style>
