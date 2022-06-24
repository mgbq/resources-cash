<template>
	<view>
		<u-navbar title="小店" :bgColor="navBgColor" :titleStyle="navTitleStyle" leftIcon=" ">
		</u-navbar>

		<view class="goods-list" :style="{marginTop:(stickyTop+10)+'px'}">
			<view class="item" v-for="(item,index) in goodList" :key="index">
				<nx-goods-item :item="item">
				</nx-goods-item>
			</view>
		</view>


		<u-tabbar :value="1" activeColor="#F4CF89" inactiveColor="#242528" :safeAreaInsetBottom="true">
			<u-tabbar-item :text="item.text" @click="tabClick" v-for="(item,index) in tabbarList">
				<image class="u-page__item__slot-icon" slot="active-icon" :src="item.activeIcon"></image>
				<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.inactiveIcon"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>
<script>
	// 获取系统状态栏的高度
	let systemInfo = uni.getSystemInfoSync()
	let cloudObjectToken = uniCloud.importObject('app_token')
	let cloudObjectGoods = uniCloud.importObject('app_goods')
	export default {
		data() {
			return {
				goodList: [],
				tabbarList: [{
						text: '首页',
						activeIcon: '/static/images/tabbar/home-select.png',
						inactiveIcon: '/static/images/tabbar/home.png',
						path: "/pages/index/index"
					},
					{
						text: '小店',
						activeIcon: '/static/images/tabbar/shop-select.png',
						inactiveIcon: '/static/images/tabbar/shop.png',
						path: "/pages/shope/index"
					},
					{
						text: '我的',
						activeIcon: '/static/images/tabbar/me-select.png',
						inactiveIcon: '/static/images/tabbar/me.png',
						path: "/pages/me/index"
					}
				],
				navTitleStyle: {
					color: "#F4CF89"
				},
				navBgColor: "#242528",
				stickyTop: 0
			};
		},
		onShow() {
			let height = systemInfo.platform == 'ios' ? 44 : 48;
			this.stickyTop = systemInfo.statusBarHeight + height - 4;

		},
		onLoad(parms) {
			this.getList()
		},
		onUnload() {

		},
		methods: {
			async getList() {
				let token = await this.getToken()
				cloudObjectGoods
					.getList(token)
					.then(res => {
						this.goodList = res.data.spus
					})
					.catch(err => {
						uni.showModal({
							content: err.message,
							showCancel: false
						})

					})
			},
			getToken() {
				return new Promise((resolve, reject) => {
					cloudObjectToken
						.getToken()
						.then(res => {
							resolve(res.access_token);
						})
						.catch(err => {
							console.log('err789465',err)
							uni.showModal({
								content: err.message,
								showCancel: false
							})
							reject(new Error('获取token失败'));
						})
				});
			},
			tabClick(index) {
				let item = this.tabbarList[index]
				this.$Router.pushTab({
					path: item.path
				})
			},

		}
	}
</script>

<style lang="less" scoped>
	.goods-list {
		// margin-top: 140rpx;
		grid-row-gap: 16rpx;
		grid-column-gap: 16rpx;
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding: 20rpx;
	}
</style>
