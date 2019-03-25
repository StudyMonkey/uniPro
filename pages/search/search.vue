<template>
	<div>		
		<input 
			class="uni-input" 
			confirm-type="search" 
			placeholder="请输入想搜索的电影"
			v-model="searchName"		
		/>	
		<uni-button size="mini" @click="handlerSearch">搜索</uni-button>
		<movie-list :movieList="movieList"></movie-list>
	</div>
</template>

<script>
	import { get } from '@/utils/utils.js'
	import MovieList from '@/pages/movieList/movieList.vue'
	export default{
		name: 'search',
		data() {
			return {
				searchName: '',
				movieList: []
			}
		},
		components: {
			MovieList
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},			
			async handlerSearch(){
				if ( this.searchName !== '' ) {
					const { data:{ subjects } } = await get('/movie/search', this.searchName);
					this.movieList = subjects
					console.log(subjects);					
				} else {
					uni.showToast({
						title: '输入内容为空'
					})
				}

			}
		},
		onReachBottom(){
			console.log('get bottom');	
		}
	}
</script>

<style scoped>
	.uni-input{
		width: 560upx;
		display: inline-block;
		padding: 3px 10px;
	}
	.uni-button{
		display: inline-block;
	}
</style>
