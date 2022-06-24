<template>
	<view class="content">
		<view class="scroll-content">
			<view class="introduce-section">
				<text class="title">{{ detailData.name }}</text>
				<view class="introduce">
					<text>发布时间：{{ formatData(detailData.create_time) }}</text>
					<text v-if="detailData.visit_cnt > 0" style="color: #ececec">|</text>
					<text v-if="detailData.visit_cnt > 0">阅读量：{{ detailData.visit_cnt }}</text>
				</view>

				<view v-if="loading" class="" style="height: 100vh"></view>

				<mp-html lazy-load :tag-style="tagStyle" :content="detailData.desc_mobile" />
			</view>
		</view>


		<nx-login-modal @handCance="handCance" :showLogin="showLogin"></nx-login-modal>

		<view class="bottom-box x-bc">
			<button class="btn no-border y-f" open-type="contact">
				<text class="cuIcon-service text-icon"></text>
				<text>客服</text>
			</button>

			<button class="btn no-border y-f" open-type="share">
				<text class="cuIcon-share text-icon"></text>
				<text>分享</text>
			</button>

			<view class="y-f" @click="toCollection">
				<text v-if="indexCollection" class="cuIcon-favorfill text-icon" style="color: #f4cf89"></text>
				<text v-else class="cuIcon-favor text-icon"></text>
				<text>收藏</text>
			</view>

			<u-button type="primary" shape="circle" @click="toReward"
				customStyle="margin: 0;width: 55%;background-color:#f4cf89; border:0;" text="复制密码"></u-button>
		</view>

	<!-- 	<ad-rewarded-video v-if="advertisingObject.excitation" ref="adinterstitial" :adpid="advertisingObject.excitation" :loadnext="true"
			v-slot:default="{loading, error}" @load="onadload" @close="onadclose" @error="onaderror">
			<button :disabled="loading" :loading="loading"></button>
			<view v-if="error">{{error}}</view>
		</ad-rewarded-video> -->

	</view>
</template>

<script>
	import mpHtml from "@/uni_modules/mp-html/components/mp-html/mp-html";
	let cloudObjectArticle = uniCloud.importObject("app_article");
	let cloudObjectCollect = uniCloud.importObject("app_collection");
	let cloudObjectAdvertising = uniCloud.importObject('app_advertising');
	import AD from "@/plugins/ad.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		components: {
			mpHtml,
		},
		computed: {
			...mapState(['islogin', 'member']),
			formatData() {
				return (time) => {
					const dataTime = this.$dayjs(time).format("YYYY-MM-DD");
					return dataTime;
				};
			},
		},
		data() {
			return {
				advertisingObject: {},
				showLogin: false,
				indexCollection: false,
				tagStyle: {
					table: "box-sizing: border-box; border-top: 1px solid #dfe2e5; border-left: 1px solid #dfe2e5;",
					th: "border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;",
					td: "border-right: 1px solid #dfe2e5; border-bottom: 1px solid #dfe2e5;",
					li: "margin: 5px 0;",
				},
				loading: true, // 是否显示骨架屏组件
				articleId: "",
				detailHtml: ``,
				detailData: {},
			};
		},
		onShow() {
			if (this.$Route.query.id) {
				this.articleId = this.$Route.query.id;
				this.getDetail(this.articleId);
			}
		},
		onLoad(options) {
			this.advertising() //查询广告
		},
		methods: {
			onadload(e) {
				console.log('广告数据加载成功');
			},
			onadclose(e) {
				const detail = e.detail
				// 用户点击了【关闭广告】按钮
				if (detail && detail.isEnded) {
					// 正常播放结束
					console.log("onadclose " + detail.isEnded);
					this.advertisingAdd()
				} else {
					uni.showToast({
						icon: "none",
						title: '看完广告才能获取成功哦'
					});
					// 播放中途退出
					console.log("onadclose " + detail.isEnded);
				}
			},
			onaderror(e) {
				// 广告加载失败
				console.log("onaderror: ", e.detail);
			},
			advertisingAdd() {
				cloudObjectAdvertising.addAdvertising({
					article: this.detailData._id,
					create_uid: this.member.user__openid,
				}).then((res) => {
					this.copyText();
					console.log(res)
				}).catch((err) => {
					console.error(err)
				})
			},
			advertising() {
				cloudObjectAdvertising.getAdvertising().then((res) => {
					if (res.length !== 0) {
						if (res[0].state == "启用") {
							this.advertisingObject = res[0];
							
							let index = this.advertisingObject.excitation.indexOf("adunit")
							if (index!=-1) {
								// 微信官方
								console.log('微信官方')
								AD.videoAdInit(this.advertisingObject.excitation);
							} else {
								// uniAd
								console.log('uniAd官方')
							}
							
						}
					}
				}).catch((err) => {
					console.error(err)
				})
			},
			uniadExcitation() {
				this.$refs.adinterstitial.show();
			},
			excitation() {
				let that = this;
				AD.videoAdShow()
					.then((res) => {
						if (res) {
							// 成功
							console.log('成功');
							this.advertisingAdd()
						} else {
							// 失败
							console.log('失败');
							uni.showToast({
								icon: "none",
								title: '看完广告才能获取成功哦'
							});
						}
					})
					.catch((err) => {
						uni.showToast({
							icon: "none",
							title: '看完广告才能获取哦'
						});
					});
			},
			copyText() {
				uni.setClipboardData({
					data: this.detailData.pass_word, // 要复制的文字
					success: function(res) {
						uni.getClipboardData({
							success: function(res) {
								uni.showToast({
									title: '复制密码成功'
								});
							}
						});
					}
				});
			},
			toReward() {
				if (!this.islogin) {
					this.showLogin = true
					return
				}

				if (!this.detailData.pass_word) {
					this.$tools.msg("暂无密码");
					return
				}

				if (!this.advertisingObject.excitation == "" && this.advertisingObject.type == "启用") {
					let index = this.advertisingObject.excitation.indexOf("adunit")
					if (index!=-1) {
						// 微信官方
						console.log('微信官方')
						this.excitation()
					} else {
						// uniAd
						console.log('uniAd官方')
						this.uniadExcitation()
					}

				} else {
					this.copyText();
				}
			},
			collectionRemove() {
				cloudObjectCollect.removeCollection({
					article: this.detailData._id,
					user_id: this.member.user__openid,
				}).then((res) => {
					this.$tools.msg("你已取消收藏");
					console.log(res)
				}).catch((err) => {
					console.error(err)
				})
			},
			collectionAdd() {
				cloudObjectCollect.addCollection({
					article: this.detailData._id,
					user_id: this.member.user__openid,
				}).then((res) => {
					this.$tools.msg("收藏成功", 3000);
					console.log(res)
				}).catch((err) => {
					console.error(err)
				})
			},
			collectionGet() {
				if (this.detailData._id) {
					cloudObjectCollect.detailsCollection({
						article: this.detailData._id,
						user_id: this.member.user__openid,
					}).then((res) => {
						if (res.affectedDocs == 1) {
							this.indexCollection = true;
						}
					}).catch((err) => {
						console.error(err)
					})
				}
			},
			handCance() {
				this.showLogin = false
				if (this.islogin) {
					this.collectionGet()
				}
			},
			toCollection() {
				if (!this.islogin) {
					this.showLogin = true
					return
				}
				if (this.indexCollection) {
					this.indexCollection = false;
					this.collectionRemove()
				} else {
					this.indexCollection = true;
					this.collectionAdd()
				}
			},
			// 路由跳转
			jump(path, parmas) {
				this.$Router.push({
					path: path,
					query: parmas,
				});
			},
			async getDetail(articleId) {
				let that = this;
				cloudObjectArticle
					.getArticle(articleId)
					.then((resData) => {
						this.loading = false;
						this.detailData = resData;
						if (this.islogin) {
							this.collectionGet()
						}
						that.setShareInfo({
							path: "pages/sub-index/articleDetail/index?id=" +
								that.detailData.article_id,
							title: that.detailData.name,
							image: that.detailData.img.url,
						});
					})
					.catch((e) => {
						console.log("e", e);
					});
			},
		},
	};
</script>



<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.content {
		display: flex;
		flex-direction: column;
		height: 100%;
		background: #fff;
	}

	/* 简介 */
	.introduce-section {
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		line-height: 1.5;

		.title {
			margin-bottom: 16upx;
			font-size: 21px;
			font-weight: 500;
			text-align: left;
			color: #333333;
			line-height: 29px;
		}

		.introduce {
			display: flex;
			font-size: 26upx;
			color: #909399;
			margin-bottom: 10px;

			text {
				margin-right: 16upx;
			}
		}
	}

	.bottom-box {
		position: fixed;
		left: 0;
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
		background: rgba(255, 255, 255, 0.95);
		box-shadow: 0 0 20rpx 0 #f0f0f0;
		width: 100%;
		padding: 20rpx 40rpx;
		font-size: 22rpx;
	}

	.text-icon {
		display: block;
		font-size: 40rpx;
		margin-bottom: 6rpx;
	}

	// .safe-area-inset-bottom {
	// 	padding-bottom: 0;
	// 	padding-bottom: constant(safe-area-inset-bottom);
	// 	padding-bottom: env(safe-area-inset-bottom);
	// }

	.btn {
		background-color: transparent;
		margin: 0;
		padding: 0;
		line-height: inherit;
		font-size: 22rpx;
	}

	.no-border:before,
	.no-border:after {
		border: 0 none;
	}
</style>
