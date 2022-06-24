<template>
	<view v-if="showLogin">
		<view class="cu-modal"  :class="showLogin?'show':''">
			<view class="cu-dialog" style="background-color: #ffff;">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请先登录</view>
					<view class="action" @tap="handleClickCancel">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view  class="bg-white">
					
					<view class="auth session">
						<!-- <view class="titlearea">
							<view class="title">请先登录</view>

						</view> -->
						<view class="auth__content popup-box-body" @click="mpWeixinTologin">
							<view class="auth__content__button">微信快捷登录</view>
						</view>
					</view>
				
				
				
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	let cloudObjectMember = uniCloud.importObject('app_member')
	export default {
		name: 'nx-login-modal',
		props: {
			showLogin: {
				type: Boolean,
				default: false
			}
		},
		mounted() {
			let isLogin = this.$storage.get('isLogin')
			if (isLogin) {
				this.mpWeixinTologin(false)
			}
		},
		data() {
			return {}
		},
		methods: {
			...mapMutations(['login']),
			mpWeixinTologin(isTip = true) {
				let _this = this
				uni.login({
					provider: 'weixin',
					success(mpres) {
						if (mpres.errMsg == 'login:ok') {
							cloudObjectMember.loginByWeixin(mpres.code).then(res => {
								if (res.code == 0) {
									if (isTip) {
										uni.showToast({
											title: '登录成功',
											icon: 'none'
										})
									}
									_this.$storage.set('isLogin',1)
									// 调用 store login
									_this.login(res)
									_this.$emit('handCance')
								}
							})
						}
					},
					fail(err) {
						console.log('uni.login', err)
					}
				})
			},
			handleClickCancel() {
				this.$emit('handCance')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.auth {
		// z-index: 9999999;
		// position: absolute;
		// left: 50%;
		// top: 50%;
		// width: calc(100% - 40rpx);
		// transform: translate(-50%, -50%);
		background: #fff;
		border-radius: 20rpx;
	}

	.session .titlearea {
		position: relative;
	}

	.session .titlearea,
	.session .titlearea .cancel {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		align-items: center;
		display: flex;
		flex-direction: row;
		height: 100rpx;
		justify-content: center;
	}

	// .session .titlearea .cancel {
	// 	left: 0;
	// 	position: absolute;
	// 	width: 100rpx;
	// }

	.auth__content {
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-box-align: center;
		-webkit-box-pack: center;
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.auth__content__text {
		font-size: 38rpx;
		margin-bottom: 40rpx;
	}

	.auth__content__button {
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-box-pack: center;
		-webkit-box-align: center;
		align-items: center;
		background-color: #f4cf89;
		border-radius: 32rpx;
		color: #fff;
		display: flex;
		flex-direction: row;
		height: 88rpx;
		justify-content: center;
		width: 100%;
	}

	.popup-box-body {
		font-size: 32rpx;
		padding: 36rpx 40rpx;
	}

	.nx-modal-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 9999996;
		transition: all 0.3s ease-in-out;
		// opacity: 0;
		// visibility: hidden;
	}
</style>
