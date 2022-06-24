<template>
	<view>
		<mp-html lazy-load :tag-style="tagStyle" :content="content" /> 
	</view>
</template>

<script>
import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html';
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				tagStyle: {
				  table: 'box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;',
				  th: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
				  td: 'border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;',
				  li: 'margin: 5px 0;'
				},
				content: ''
			};
		},
		onShow() {
			let richtext = uni.getStorageSync('__rich_text');
			this.content = richtext;

		},
	}
</script>

<style lang="scss">

</style>
