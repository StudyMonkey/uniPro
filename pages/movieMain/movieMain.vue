<template>
	<div>
		<uni-button 
			v-for="(item,index) in types"
			:key="index"
			@click="handleRoute(item.type)"
		>{{item.text}}</uni-button>
	</div>
</template>

<script>
	export default{
		name: 'movieMain',
		data() {
			return {
				types: [
					{type: '/movie/top250', text: 'Top250'},
					{type: '/movie/in_theaters', text: '正在热映'},
					{type: '/movie/coming_soon', text: '即将上映'},
					{type: '/movie/weekly', text: '口碑榜'},
					{type: '/movie/us_box', text: '北美票房榜'},
					{type: '/movie/new_movies', text: '新片榜'}
				]
			}
		},
		methods: {
			handleRoute(type) {
				uni.navigateTo({
					url: '/pages/movie/movie?type='+type
				})
			}
		},
	}
</script>

<style scoped>
	uni-button{
		margin-top: 20px;
	}
</style>
