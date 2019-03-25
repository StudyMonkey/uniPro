<template>
	<div>
		This is book page
	</div>
</template>

<script>
	export default{
		name: 'book',
		onLoad(option){
			console.log(option.type)
			this.tag = option.type
		},
		data() {
			return {
				tag: ''
			}
		},
	}
</script>

<style>
</style>
