<template>
	<view>
		<view @touchmove.stop.prevent class="cu-modal" :class="show?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white act-title">
					<view class="content" style="font-size: 18px;
color: #333333;">公告</view>
				</view>
				<view class="bg-white" style="
				padding:20px;
				text-align: left;
				min-height: 200px;
                max-height: 200px;
                overflow: auto;">
					<view style="margin-bottom: 20px;">
						<view style="font-size: 15px;color: #333333;">{{noticeData.title}}</view>
					</view>


				</view>

				<view class="bg-white" style="display: flex;justify-content: center;padding-top: 20px;">
					<view class="okisee" @click='hideModal'>我知道了</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
		name: 'nx-notice-modal',
		props: {
			// 是否显示
			show: {
				type: Boolean,
				default: false
			},
			noticeData: {
				type: Object,
				default: {
					title: '暂无', // 满
				}
			}

		},
		data() {
			return {}
		},
		methods: {
			hideModal() {
				this.$emit('hideModal'); //通知父组件改变
			}

		}
	}
</script>

<style lang="scss" scoped>
	.cu-modal {
		z-index: 2000;
	}

	.act-title {
		background-size: 100% 100%;
	}

	.okisee {
		margin: 0 20px 20px 20px;
		background: linear-gradient(132deg, #F4CF89 0%, #F4CF89 100%);
		opacity: 1;
		width: 670rpx;
		border-radius: 48px;
		text-align: center;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bold;
		line-height: 76rpx;
	}
</style>
