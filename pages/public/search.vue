<template>
	<view>
		<u-navbar title="搜索" :placeholder="true" :bgColor="navBgColor" :titleStyle="navTitleStyle" leftIconColor="#F4CF89" :autoBack="true">
		</u-navbar>
		
		<view class="cu-bar search" style="padding: 0 15rpx;margin: 15rpx 0;">
			<view class="search-form">
				<text class="cuIcon-search"  style="color: #999;"></text>
				<input type="text" placeholder="请输入关键字" v-model="keyword"></input>
			</view>
			<view class="search-btn x-c" @click="serachList">搜索</view>
		</view>
		
		<mescroll-body ref="'mescrollRef'" @init="mescrollInit" top="0" :down="downOption"
			@down="downCallback" :up="upOption" @up="upCallback" height="80%">
			<nx-article-list  :articleList="newList" />
		</mescroll-body>
	</view>
</template>
<script>
	let cloudObjectArticle = uniCloud.importObject('app_article')
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
				keyword:'',
				navTitleStyle: {
					color: "#F4CF89"
				},
				navBgColor: "#242528",
				newList: [],
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					textNoMore: '--- 实在没有啦 ---',
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 2, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						use: false,
						tip: '~ 空空如也 ~' // 提示
						// btnText: '去看看'
					}
				},
			};
		},
		onLoad(parms) {

		},
		onUnload() {

		},
		methods: {
			serachList(){
				this.mescroll.resetUpScroll()
			},
			async upCallback(page) {
				let that = this
				if (this.keyword.length==0) {
					this.$tools.msg('请输入关键字');
					this.mescroll.endErr()
					return;
				}
				let parames = {
					keyword: this.keyword,
					pageNum: page.num,
					pageSize: page.size
				}
				cloudObjectArticle.getList(parames)
					.then(res => {
						if(res.data.length==0 && page.num==1){
							this.$tools.msg('暂无数据');
						}
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
		}
	}
</script>

<style lang="less" scoped>
	
	.cu-bar .search-form {
		margin: 0;
		border-top-left-radius: 64rpx;
		border-bottom-left-radius: 64rpx;
		background-color: #fff;
	}
	
	.search-btn{
		border-top-right-radius: 64rpx;
		border-bottom-right-radius: 64rpx;
		background-color: #F4CF89;
		line-height: 64rpx;
		height: 64rpx;
		font-size: 26rpx;
		color: #fff;
		width: 15%;
		text-align: center;
	}
</style>
