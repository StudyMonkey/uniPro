<template>
	<div>
		<div>
			<uni-button 
				v-for="(item,index) in types"
				:key="index"
				@click="handleRoute(item.type)"
			>{{item.text}}</uni-button>
		</div>		
	</div>
</template>

<script>
	export default{
		name: 'main',
		props: {
			types: {
				type: Array,
				required: true
			},
			page: {
				type: String
			}
		},
		data() {
			return {
				pageType: this.page
			}
		},
		methods: {
			handleRoute(type) {
				if ( this.pageType === 'movie' ) {
					uni.navigateTo({
						url: '/pages/movie/movie?type='+type
					})					
				} else if ( this.pageType === 'book' ){
					uni.navigateTo({
						url: '/pages/book/book?type='+type
					})					
				}

			}
		},
	}
</script>

<style scoped>
	uni-button{
		margin-top: 20px;
	}
</style>
