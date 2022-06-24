<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="weburl"></web-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#F4CF89'
					}
				},
				// 路径地址
				weburl: ''
			}
		},
		onLoad(res){
			this.weburl = decodeURIComponent(res.url);
			
			uni.setNavigationBarTitle({
			    title: '牛云 ' + (res.title || '')
			});
		}
	}
</script>

<style lang="scss">
</style>
