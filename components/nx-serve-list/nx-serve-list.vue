<template>
	<view class="servelist">
		<view class="mine-services">
			<view @tap="handleBottomServiceClick(item)" class="service-item" hoverClass="hover"
				v-for="(item, index) in list" :key="index">
				<image class="service-icon" :src="item.iconUrl"></image>
				<text class="service-label">{{item.label}}</text>
				<view class="nav-wrapper">
					<u-icon class="nav-to" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		methods: {
			handleBottomServiceClick(item) {
				this.$emit('itemClick',item)
			},
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.servelist {
		padding: 20rpx;

		.mine-services {
			margin-bottom: 20rpx;
			box-shadow: 0 4rpx 20rpx 0 rgba(0, 0, 0, .05);
			border-radius: 20rpx;
			padding: 0 27rpx;
			background: #fff;
			border-radius: 20rpx;

			.service-item {
				height: 92rpx;
				line-height: 92rpx;

				.service-icon {
					height: 40rpx;
					width: 40rpx;
					object-fit: cover;
					vertical-align: middle;
				}

				.service-label {
					margin-left: 16rpx;
					font-family: PingFangSC-Regular;
					font-size: 32rpx;
					color: #111;
					vertical-align: middle;
				}

				.nav-wrapper {
					display: flex;
					float: right;
					height: 100%;
					line-height: 92rpx;

					.nav-to {
						height: 18rpx;
						width: 18rpx;
						object-fit: cover;
						vertical-align: middle;
					}

				}

			}
		}
	}
</style>
