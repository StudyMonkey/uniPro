<template>
	<div class="uni-product-list">
		<div 
			class="uni-product" 
			v-for="(movie,index) in movieList" 
			:key="index"
			@click="handleDetailClick(movie)"
		>
			<div class="image-view">
				<image 
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
	</div>
</template>

<script>
	import uniTag from '@/components/uni-tag/uni-tag.vue'
	export default{
		name: 'movieList',
		props: {
			movieList: {
				type: Array,
				required: true
			}
		},
		computed: {
			more() {
				if ( this.movieList.length < 20 ) {
					return false
				} else {
					return true
				}
			},
			isSubject(){
				return this.type === '/movie/weekly' || this.type === '/movie/us_box'
			}			
		},
		components: {
			uniTag
		},
		methods: {
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
	}
</script>

<style scoped>
	.uni-product-title{
		font-size: 16px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.image-view{
		position: relative;
	}
	.image-view span{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0,0,0,.5);
		color: #fff;
		text-align: right;
		padding-right: 5px;
	}
	.uni-tag{
		margin-right: 4px;
	}
	.bottomP{
		width: 100%;
		text-align: center;
	}	
</style>
