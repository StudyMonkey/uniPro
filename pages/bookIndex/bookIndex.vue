<template>
	<div>
		<x-main :types="types" page="book"></x-main>
	</div>
</template>

<script>
	import XMain from '@/components/main'
	export default{
		name: 'bookIndex',
		components: {
			XMain
		},
		data() {
			return {
				types: [
					{ type: '旅行', text: '旅行' },
					{ type: '前端', text: '前端' }
				]
			}
		},
	}
</script>

<style>
</style>
