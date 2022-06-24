<template>
	<view>
		<u-navbar title="个人中心" :bgColor="navBgColor" :titleStyle="navTitleStyle" leftIcon=" "></u-navbar>
		<view class="header">
			<!-- 个人信息 -->
			<view class="info-box x-bc">
				<view class="x-f">
					<view class="head-img-wrap">
						<image class="head-img" :src="member.user_headimg || '/static/images/me/base_avatar.png'"
							mode="aspectFill"></image>
					</view>
					<text @click="userNameClick"
						class="user-name u-ellipsis-1">{{ member.user_nickname || '去登录~' }}</text>
				</view>
				<view v-if="islogin" @click="navPersonalData">
					<u-icon  name="setting" color="#fff" size="24"></u-icon>
				</view>
			</view>
		</view>
		<nx-serve-list @itemClick="itemClick" :list="serveList" />
		<nx-login-modal @handCance="handCance" :showLogin="showLogin"></nx-login-modal>

		<u-tabbar v-if="tabbarValue" :value="tabbarValue" activeColor="#F4CF89" inactiveColor="#242528"
			:safeAreaInsetBottom="true">
			<u-tabbar-item :text="item.text" @click="tabClick" v-for="(item, index) in tabbarList" :key="index">
				<image class="u-page__item__slot-icon" slot="active-icon" :src="item.activeIcon"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.inactiveIcon"></image>
			</u-tabbar-item>
		</u-tabbar>
		
		
	</view>
</template>
<script>
	let cloudObjectBaseConfig = uniCloud.importObject('app_base_config')
	let cloudObjectAbout = uniCloud.importObject('app_about')
	let cloudObjectMember = uniCloud.importObject('app_member')
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				showLogin: false,
				tabbarValue: 0,
				baseConfig: {
					appTitle: '源码好优多',
					articleType: 2, // 默认大图
					state: '禁用'
				},
				tabbarList: [{
						text: '首页',
						activeIcon: '/static/images/tabbar/home-select.png',
						inactiveIcon: '/static/images/tabbar/home.png',
						path: '/pages/index/index'
					},
					{
						text: '我的',
						activeIcon: '/static/images/tabbar/me-select.png',
						inactiveIcon: '/static/images/tabbar/me.png',
						path: '/pages/me/index'
					}
				],
				serveList: [{
						iconUrl: '/static/images/me/collect.png',
						label: '我的收藏'
					},
					{
						iconUrl: '/static/images/me/about.png',
						label: '关于我们'
					},
					{
						iconUrl: '/static/images/me/exit.png',
						label: '退出登录'
					}
				],
				navTitleStyle: {
					color: '#F4CF89'
				},
				navBgColor: '#242528',
				aboutConfig: {}
			}
		},
		computed: {
			...mapState(['islogin', 'member'])
		},
		onShow() {
			this.getBaseConfig() //  查询基础配置
			this.loadData()
		},
		onLoad(parms) {
			this.getAboutConfig()
		},
		onUnload() {},
		methods: {
			navPersonalData(){
				uni.navigateTo({
					url: '/pages/sub-me/personal/personal'
				})
			},
			...mapMutations(['logout', 'putMember']),
			loadData() {
				let that = this
				if (!this.islogin) {
					return
				}
				let uid = uniCloud.getCurrentUserInfo().uid
				cloudObjectMember.getData(uid).then(res => {
					that.putMember(res.member)
				})
			},
			userNameClick() {
				if (!this.islogin) {
					this.showLogin = true
					return
				}
			},
			updateServelis() {
				if (this.islogin) {
					this.serveList = [{
							iconUrl: '/static/images/me/collect.png',
							label: '我的收藏'
						},
						{
							iconUrl: '/static/images/me/about.png',
							label: '关于我们'
						},
						{
							iconUrl: '/static/images/me/exit.png',
							label: '退出登录'
						}
					]
				} else {
					this.serveList = [{
							iconUrl: '/static/images/me/collect.png',
							label: '我的收藏'
						},
						{
							iconUrl: '/static/images/me/about.png',
							label: '关于我们'
						}
					]
				}
				if (this.baseConfig.state == '启用') {
					let tempArray = [{
							iconUrl: '/static/images/me/order.png',
							label: '订单'
						},
						{
							iconUrl: '/static/images/me/shoppingBag.png',
							label: '购物袋'
						}
					]
					this.serveList = tempArray.concat(this.serveList)
				}

			},
			handCance() {
				this.showLogin = false
				this.loadData()
				this.updateServelis()
			},
			itemClick(item) {
				if (!this.islogin) {
					this.showLogin = true
					return
				}
				if (item.label === '我的收藏') {
					uni.navigateTo({
						url: '/pages/sub-me/collection/collection?openid='+this.member.user__openid
					})
				} else if (item.label === '关于我们') {
					if (this.aboutConfig.type == '网页') {
						uni.navigateTo({
							url: `/pages/public/web?url=${this.aboutConfig.url}`
						})
					} else if (this.aboutConfig.type == '内容') {
						uni.setStorage({
							key: '__rich_text',
							data: this.aboutConfig.content,
							success() {
								uni.navigateTo({
									url: '/pages/public/rich-text'
								})
							}
						})
					}
				} else if (item.label === '退出登录') {
					uni.showToast({
						title: '退出成功',
						icon: 'none'
					})
					this.logout()
					this.updateServelis()
				} else if (item.label === '订单') {
					wx.navigateTo({
						url: 'plugin-private://wx34345ae5855f892d/pages/orderList/orderList'
					});
				} else if (item.label === '购物袋') {
					wx.navigateTo({
						url: 'plugin-private://wx34345ae5855f892d/pages/shoppingCart/shoppingCart',
					});
				}
			},
			async getAboutConfig() {
				cloudObjectAbout.getAboutObj().then(res => {
					if (res.data.length) {
						this.aboutConfig = res.data[0]
					}
				})
			},
			async getBaseConfig() {
				cloudObjectBaseConfig.getBaseConfigObj().then(res => {
					if (res.data.length) {
						this.baseConfig = res.data[0]
						this.updateServelis()
						if (this.baseConfig.state == '启用') {
							this.tabbarValue = 2
							this.tabbarList = [{
									text: '首页',
									activeIcon: '/static/images/tabbar/home-select.png',
									inactiveIcon: '/static/images/tabbar/home.png',
									path: '/pages/index/index'
								},
								{
									text: '小店',
									activeIcon: '/static/images/tabbar/shop-select.png',
									inactiveIcon: '/static/images/tabbar/shop.png',
									path: '/pages/shop/index'
								},
								{
									text: '我的',
									activeIcon: '/static/images/tabbar/me-select.png',
									inactiveIcon: '/static/images/tabbar/me.png',
									path: '/pages/me/index'
								}
							]
						} else {
							this.tabbarValue = 1
									this.tabbarList = [{
									text: '首页',
									activeIcon: '/static/images/tabbar/home-select.png',
									inactiveIcon: '/static/images/tabbar/home.png',
									path: '/pages/index/index'
								},
								{
									text: '我的',
									activeIcon: '/static/images/tabbar/me-select.png',
									inactiveIcon: '/static/images/tabbar/me.png',
									path: '/pages/me/index'
								}
							]
						}
					}
				})
			},
			tabClick(index) {
				let item = this.tabbarList[index]
				this.$Router.pushTab({
					path: item.path
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.header {
		background-color: #242528;
		height: 335rpx;
		padding-top: 190rpx;

		.info-box {
			padding: 0 47rpx;

			.head-img-wrap {
				position: relative;

			}

			.head-img {
				width: 94rpx;
				height: 94rpx;
				border-radius: 50%;
				background: #ccc;
				margin-right: 25rpx;
				overflow: hidden;
			}

			.user-name {
				font-size: 30rpx;
				font-weight: 500;
				color: #fff;
				line-height: 30rpx;
				width: 180rpx;
			}
		}
	}
</style>
