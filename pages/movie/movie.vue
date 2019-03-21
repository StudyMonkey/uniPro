<template>
	<div>
		<div 
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
		</div>
	</div>
</template>

<script>
	// import { get } from '../../utils/utils.js'
	import { getMovie } from '../../utils/api.js'
	import uniCard from '@/components/uni-card/uni-card.vue'
	export default{
		name: 'movie',
		data() {
			return {
				movieList: [],
				page: 0
			}
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
			uniCard
		},
		methods: {
			async getList(init){
// 				if ( init ) {
// 					this.page = 0
// 					const { data: { subjects } } = await get('/movie', this.page);
// 					this.movieList = subjects;
// 				} else {
// 					this.page += 8
// 					const { data: { subjects } } = await get('/movie', this.page);
// 					this.movieList = this.movieList.concat(subjects);
// 				}
				const { subjects } = await getMovie();
				console.log('movie vue', subjects);
				this.movieList = subjects;
			}
		},
		created() {
			console.log('movie created');
			this.getList(true)			
			
			console.log(this.movieList);
		},
		onReachBottom(){
			console.log('1111');
			console.log(this.page);
			this.getList(false)	
					
		}
	}
</script>

<style>
</style>
