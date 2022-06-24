<template>
	<view>
		<u-navbar :bgColor="navBgColor" :titleStyle="navTitleStyle" leftIcon=" ">
			<view slot="left" class="nav-title">
				{{ baseConfig.appTitle }}
			</view>
			<view slot="right" :style="[navSearchStyle]">
				<view class="search-box u-flex u-row-center u-col-center u-m-r-30"
					@tap="$Router.push('/pages/public/search')">
					<u-icon name="search" size="30" color="#fff"></u-icon>
				</view>
			</view>
		</u-navbar>

		<u-sticky v-if="stickyTop" :offsetTop="stickyTop">
			<!-- 导航 -->
			<view class="navbar">
				<view class="menu" v-if="categoryList.length > 0">
					<view class="category">
						<scroll-view :scroll-x="true" :scroll-into-view="scroll_category_id">
							<view class="item" v-for="(item, index) in categoryList" :key="index"
								:class="category_id == item._id ? 'current' : ''" :id="'category_id-' + index"
								:style="'width:' + (category.length <= 4 ? 100 / category.length + '%' : '')"
								@tap="categoryChange(item._id, index)">
								<view class="text">
									<text>{{ item.name }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="list" @tap="menuShow()">
						<u-icon name="list" :size="30"></u-icon>
					</view>
				</view>
				<view class="menu-block fade-in" v-show="showMenu">
					<view class="list">
						<text class="item" v-for="(item, index) in categoryList" :key="index"
							:class="category_id == item._id ? 'current' : ''" :id="'category_id-' + (index + 1)"
							@tap="categoryChange(item._id, index)">
							{{ item.name }}
						</text>
						<view style="border-bottom: 1px solid #ececec;
    margin: 20rpx;"></view>


						<text @click="changeQueryIndex(0)" class="item" :class="queryIndex == 0 ? 'current' : ''">
							最新
						</text>

						<text @click="changeQueryIndex(1)" class="item" :class="queryIndex == 1 ? 'current' : ''">
							最热
						</text>

					</view>
				</view>
			</view>
		</u-sticky>
		<view class="home-content" :style="{marginTop:(stickyTop+10)+'px'}">
			<view class="banner">
				<view class="banner-content">
					<u-swiper previousMargin="30" nextMargin="30" showTitle indicator indicatorMode="line"
						@click="goToPage()" :list="bannerList" keyName="img" circular></u-swiper>
				</view>
			</view>


			<!-- 公告-->
			<view class="x-c u-skeleton-fillet" v-if="noticeList.length > 0"
				style="overflow: hidden; padding: 20px 12px; background-color: #fff; height: 40px; margin: 20rpx 20rpx 0 20rpx;">
				<view style="font-weight: bold">公告</view>
				<view class="notice-content">
					<u-notice-bar color="#242528" direction="column" @click="noticeClick" duration="5000"
						bg-color="#fff" type="none" :volume-icon="false" :text="noticeList"></u-notice-bar>
				</view>
			</view>
		</view>


		<mescroll-body ref="'mescrollRef'" @init="mescrollInit" top="0" :down="downOption" @down="downCallback"
			:up="upOption" @up="upCallback" height="80%">
			<nx-article-list :videoAd="advertisingObject.home_banner" :type="baseConfig.articleType"
				:articleList="newList" />
		</mescroll-body>


		<nx-notice-modal :show="noticeShow" :noticeData="noticeData" @hideModal="handleHideModal"></nx-notice-modal>

		<u-tabbar :value="0" activeColor="#F4CF89" inactiveColor="#242528" :safeAreaInsetBottom="true">
			<u-tabbar-item :text="item.text" @click="tabClick" v-for="(item, index) in tabbarList" :key="index">
				<image class="u-page__item__slot-icon" slot="active-icon" :src="item.activeIcon"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.inactiveIcon"></image>
			</u-tabbar-item>
		</u-tabbar>


	<!-- 	<ad-interstitial ref="adinterstitial" v-if="advertisingObject.insertScreen_id" :adpid="advertisingObject.insertScreen_id" :loadnext="true" v-slot:default="{loading, error}" @load="onadload" @close="onadclose"
			@error="onaderror">
			<button :disabled="loading" :loading="loading">显示广告</button>
			<view v-if="error">{{error}}</view>
		</ad-interstitial> -->

	</view>
</template>
<script>
	let cloudObjectBanner = uniCloud.importObject('app_banner')
	let cloudObjectCategory = uniCloud.importObject('app_category')
	let cloudObjectArticle = uniCloud.importObject('app_article')
	let cloudObjectShare = uniCloud.importObject('app_share')
	let cloudObjectNotice = uniCloud.importObject('app_notice')
	let cloudObjectBaseConfig = uniCloud.importObject('app_base_config')
	let cloudObjectAdvertising = uniCloud.importObject('app_advertising');
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync()
	let menuButtonInfo = {}
	// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
	menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	// #endif
	// 引入mescroll-mixins.js
	import MescrollMixin from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js'
	import MescrollBody from '@/uni_modules/mescroll-uni/components/mescroll-body/mescroll-body.vue'
	export default {
		components: {
			MescrollBody
		},
		props: {
			i: 1 // 每个tab页的专属下标和index0值不同//防止mescrollnti自动调用downCallback
		},
		mixins: [MescrollMixin],
		data() {
			return {
				advertisingObject: {},
				baseConfig: {
					appTitle: '源码好优多',
					articleType: 2, // 默认大图
					state: '禁用'
				},
				stickyTop: 0,
				tabbarList: [{
						text: '首页',
						activeIcon: '/static/images/tabbar/home-select.png',
						inactiveIcon: '/static/images/tabbar/home.png',
						path: "/pages/index/index"
					},
					{
						text: '我的',
						activeIcon: '/static/images/tabbar/me-select.png',
						inactiveIcon: '/static/images/tabbar/me.png',
						path: "/pages/me/index"
					}
				],
				navBgColor: '#242528',
				bannerList: [],
				noticeList: [],
				categoryList: [{
					_id: 1,
					name: '全部'
				}],
				category_id: 1,
				category_index: 0,
				scroll_category_id: 'scroll_category_id_0',
				showMenu: false,
				noticeShow: false,
				noticeData: {
					title: ''
				},
				queryIndex: 0,
				newList: [],
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					textNoMore: '--- 实在没有啦 ---',
					auto: false, // 不自动加载
					noMoreSize: 2, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: false,
						tip: '~ 空空如也 ~' // 提示
						// btnText: '去看看'
					}
				}
			}
		},
		computed: {
			// 导航栏搜索的样式
			navSearchStyle() {
				let style = {}
				// #ifdef MP
				let rightButtonWidth = systemInfo.windowWidth - menuButtonInfo.left
				style.marginRight = rightButtonWidth + 'px'
				// #endif
				return style
			}
		},
		onShow() {
			uni.hideTabBar();
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			this.stickyTop = systemInfo.statusBarHeight + height - 4;
		},
		onLoad(parms) {
			this.getBanner() // 查询轮播图
			this.getType() // 查询分类
			this.getSharInfo() //  查询分享信息
			this.getNotice() //  查询公告
			this.getBaseConfig() //  查询基础配置
			this.advertising() //查询广告
		},
		onUnload() {},
		methods: {
			onadload(e) {
				console.log('插屏 ad 加载成功')
				this.$refs.adinterstitial.show();
			},
			onadclose(e) {
				console.log("onadclose", e);
			},
			onaderror(e) {
				// 广告加载失败
				console.log("onaderror: ", e.detail);
			},
			advertising() {
				let _this = this
				cloudObjectAdvertising.getAdvertising().then((res) => {
					if (res.length !== 0) {
						if (res[0].state == "启用") {
							this.advertisingObject = res[0];
							setTimeout(function() {
								_this.adOption = {
									adUnitId: _this.advertisingObject
										.insertScreen_id // HBuilder基座的测试广告位
								};
								// 创建广告实例
								_this.createInterstitialAd();
							}, 10000); //3秒之后执行函数
						}
					}
				}).catch((err) => {
					console.error(err)
				})
			},
			showInterstitialAd() {
				// 调用 interstitialAd.show()，如果数据正在加载中不会显示广告，加载成功后才显示
				// 在数据没有加载成功时，需要防止用户频繁点击显示广告
				this.interstitialAd.show().then(() => {});
			},
			createInterstitialAd() {
				var interstitialAd = this.interstitialAd = uni.createInterstitialAd(this.adOption);
				interstitialAd.onLoad(() => {
					console.log("插屏 广告加载成功");
					interstitialAd.show().then(() => {});

				});
				interstitialAd.onClose(() => {
					// 用户点击了关闭或返回键(仅Android有返回键)
					console.log("插屏 广告关闭");
				});
				interstitialAd.onError((err) => {
					console.log("插屏 广告加载失败");
				});

			},
			async getBaseConfig() {
				cloudObjectBaseConfig.getBaseConfigObj().then(res => {
					if (res.data.length) {
						this.baseConfig = res.data[0]
						if (this.baseConfig.state == '启用') {
							this.tabbarList = [{
									text: '首页',
									activeIcon: '/static/images/tabbar/home-select.png',
									inactiveIcon: '/static/images/tabbar/home.png',
									path: "/pages/index/index"
								},
								{
									text: '小店',
									activeIcon: '/static/images/tabbar/shop-select.png',
									inactiveIcon: '/static/images/tabbar/shop.png',
									path: "/pages/shop/index"
								},
								{
									text: '我的',
									activeIcon: '/static/images/tabbar/me-select.png',
									inactiveIcon: '/static/images/tabbar/me.png',
									path: "/pages/me/index"
								}
							]
						}
					}
				})
			},
			async getNotice() {
				cloudObjectNotice.getList().then(res => {
					this.noticeList = res
				})
			},
			goToPage(index) {
				let item = this.bannerList[index]
				if (item.type == '文章') {
					this.$Router.push({
						path: "/pages/sub-index/articleDetail/index",
						query: {
							id: item.url
						}
					})
				}
				if (item.type == '网页') {
					this.$Router.push({
						path: "/pages/public/web",
						query: {
							url: item.url
						}
					})
				}
				if (item.type == '小程序') {
					wx.navigateToMiniProgram({
						appId: item.appId,
						path: item.url, //空则默认打开另一个小程序的首页
					})
				}
				if (item.type == '小程序插件') {
					wx.navigateTo({
						url: item.url
					});
				}
			},
			getSharInfo() {
				let that = this;
				cloudObjectShare.getShareObj().then(res => {
					let shareInfo = {}
					shareInfo.title = res.share_title
					shareInfo.image = res.share_img
					shareInfo.path = 'pages/index/index'
					that.setShareInfo(shareInfo)
				})
			},
			getArticleList() {
				this.mescroll.resetUpScroll()
			},
			tabClick(index) {
				let item = this.tabbarList[index]
				this.$Router.pushTab({
					path: item.path
				})
			},
			getBanner() {
				cloudObjectBanner.getList().then(res => {
					this.bannerList = res
				})
			},
			getType() {
				cloudObjectCategory.getList().then(res => {
					this.categoryList = this.categoryList.concat(res.data)
					this.getArticleList() // 查询文章
				})
			},
			async upCallback(page) {
				let that = this
				let parames = {
					categoryId: this.category_id,
					queryIndex: this.queryIndex,
					pageNum: page.num,
					pageSize: page.size
				}
				cloudObjectArticle.getList(parames)
					.then(res => {
						let curPageData = res.data
						//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
						this.mescroll.endByPage(curPageData.length, 100)
						//设置列表数据
						if (page.num == 1) this.newList = [] //如果是第一页需手动制空列表
						this.newList = this.newList.concat(curPageData) //追加新数据
					})
					.catch(() => {
						//联网失败, 结束加载
						this.mescroll.endErr()
					})
			},
			changeQueryIndex(index) {
				this.queryIndex = index
				this.showMenu = false
				this.getArticleList() // 查询文章
			},
			handleHideModal() {
				this.noticeShow = false
			},
			/*菜单框展示*/
			menuShow() {
				this.showMenu = !this.showMenu
			},
			/*切换导航*/
			categoryChange(category_id, index) {
				this.showMenu = false
				this.category_index = index
				this.category_id = category_id
				var nextIndex = index - 1
				nextIndex = nextIndex <= 0 ? 0 : nextIndex
				this.scroll_category_id = `category_id-${nextIndex}` //动画滚动,滚动至中心位置
				this.getArticleList() // 查询文章
			},
			noticeClick(index) {
				this.noticeData.title = this.noticeList[index]
				this.noticeShow = true
			}
		},
		onUnload() {
			// 页面关闭后销毁实例
			this.interstitialAd.destroy()
		},
	}
</script>

<style lang="less" scoped>
	.nav-title {
		color: #f4cf89;
		font-size: 38rpx;
		width: 360rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search-box {
		display: flex;
		justify-content: center;
		width: 66rpx;
		height: 66rpx;
		background: rgba(#000, 0.18);
		border-radius: 100%;
	}

	.header {
		background-color: #242528;
		height: 235rpx;
	}

	.home-content {
		// margin-top: 160rpx;

		.banner {
			// display: flex;
			// justify-content: center;

			margin: 20rpx;

			.banner-content {
				// width: 100%;
			}
		}

		.notice-content {
			flex: 1;
		}
	}

	/* 顶部navbar */
	.navbar {
		margin: 0 0 20rpx 0;
		position: relative;
		background-color: #fff;

		/*分类*/
		.menu {
			position: relative;
			height: 80rpx;
			white-space: nowrap;
			padding: 15rpx 0 6rpx;
			z-index: 10;
			display: flex;
			align-items: center;
			justify-content: space-between;

			/*分类*/
			.category {
				margin-left: 20rpx;
				white-space: nowrap;
				position: relative;

				scroll-view {
					width: auto;

					.item {
						position: relative;
						display: inline-block;
						margin: 0 31rpx 0;

						text-align: left;


						&:first-child {
							margin-left: 10rpx;
						}

						&:after {
							content: '';
							width: 0;
							height: 0;
							position: absolute;
							left: 50%;
							bottom: 0;
							transform: translateX(-50%);
							transition: 0.3s;
						}

						.text {
							position: relative;
							width: auto;
							height: auto;
							line-height: auto;
							display: inline-block;

							text {
								font-size: 34rpx;
								color: #555;
							}

							image {
								position: absolute;
								top: 16rpx;
								right: -14rpx;
								width: 50rpx;
								height: 50rpx;
								display: none;
							}
						}
					}

					.current {
						&:after {
							width: 50%;
						}

						.text {
							text {
								// font-size: 40rpx;
								// font-weight: bold;
								color: #f4cf89;
							}

							image {
								display: block;
							}

							border-bottom: 6rpx solid #f4cf89;
						}
					}
				}
			}

			.list {
				// width: 70rpx;
				margin-right: 20rpx;
				// height: 80rpx;
				//padding-top: 7rpx;
			}
		}
	}

	.menu-block {
		position: absolute;
		left: 0;
		background: #fff;
		border-bottom: 1rpx solid #f5f5f5;
		padding: 20rpx 0 50rpx;
		z-index: 100;
		width: 100%;

		box-shadow: 0 15rpx 10rpx -15rpx #e9ebee;

		.list {
			text {
				background: #f5f7fa;
				border-radius: 8rpx;
				font-size: 28rpx;
				margin: 12rpx 20rpx;
				display: inline-block;
				height: 72rpx;
				// width: 144rpx;
				line-height: 72rpx;
				text-align: center;
				padding: 0 20rpx;
			}

			.current {
				color: #fff;
				background: #f4cf89;
			}
		}
	}

	.queryActive {
		color: #f4cf89;
		font-size: 14px;
	}
</style>
