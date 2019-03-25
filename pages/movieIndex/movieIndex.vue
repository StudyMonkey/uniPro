<template>
	<div>
		<x-main :types="types" page="movie"></x-main>
	</div>
</template>

<script>
	import XMain from '@/components/main'
	export default{
		name: 'movieIndex',
		components: {
			XMain
		},
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
	}
</script>

<style>
</style>
