<template>
	<div>
		<input 
			class="uni-input" 
			confirm-type="search" 
			placeholder="请输入想搜索的电影"
			v-model="searchMovieName"
			@focus="handleInputFocus"
		/>
		<movie-list :movieList="movieList"></movie-list>
<!-- 		<div class="uni-product-list">
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
					/>
					<span class="fr" v-text="isSubject ? movie.subject.rating.average : movie.rating.average+'分'"></span>
				</div>	
				<div class="uni-product-title" v-text="isSubject ? movie.subject.title : movie.title"></div>	
				<div>
					<uni-tag 
						v-for="(tag,ind) in movie.genres" 
						size="small" type="primary" 
						:inverted="true" 
						:key="ind" 
						:circle="true" 
						:text="tag"
					></uni-tag>
				</div>		
			</div>
			<p class="bottomP" v-if="!more">----------无更多精彩内容-----------</p>
		</div>	 -->	
	</div>
</template>

<script>
	import { get,getType } from '../../utils/utils.js'
	
	import MovieList from '@/pages/movieList/movieList.vue'
	export default{
		name: 'movie',
		data() {
			return {
				movieList: [],
				page: 0,
				more: true,
				type: '',
				searchMovieName: ''
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
			}
		},
		components: {
			MovieList
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
			},
			// input focus事件
			handleInputFocus(){
				console.log(11111);
				uni.navigateTo({
					url: '/pages/search/search'
				})
			}						
		},
		created() {
			this.getList(true)			
			
			console.log('movieList', this.movieList);
		},
		onReachBottom(){
			this.getList(false)	
		}
	}
</script>

<style scoped>
	.fl{
		float: left;
	}
</style>
