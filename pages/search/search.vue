<template>
	<div>		
		<input 
			class="uni-input" 
			confirm-type="search" 
			placeholder="请输入想搜索的电影"
			v-model="searchName"
			@click="handlerSearch"
		/>	
		<uni-button size="mini">搜索</uni-button>
	</div>
</template>

<script>
	import { get } from '@/utils/utils.js'
	export default{
		name: 'search',
		data() {
			return {
				searchName: ''
			}
		},
		components: {
			// uniButton
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},			
			async handlerSearch(){
				const res = await get('/movie/search', this.searchName);
				console.log(res);
			}
		}
	}
</script>

<style>
</style>
