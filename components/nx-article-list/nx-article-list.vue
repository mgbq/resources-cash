<template>
	<view style="padding-bottom: 16px;">
		<block v-for="(newpos, index) in articleList" :key="index">
			<!--  左图 右文 -->
			<view class="menu-scroll-list" @click="routerTo(newpos)" v-if="type == 1">
				<view class="menu-scroll-list-img">
					<image class="nx-img" :src="newpos.img.url" mode="aspectFill"></image>
				</view>
				<view class="menu-scroll-list-right">
					<view class="menu-scroll-list-h">
						{{ newpos.name }}
					</view>
					<view class="menu-scroll-list-describe x-bc">
						<view>{{ formatData(newpos.create_time) }}</view>
						<view>
							<image mode="aspectFill" src="/static/images/index/eye.png"
								style="height: 10px;width: 14px;margin-right: 10rpx;">
							</image>
							{{newpos.visit_cnt}}
						</view>
					</view>
				</view>
			</view>

			<!-- 大图模式 -->
			<view class="list-one-w" @click="routerTo(newpos)" v-if="type == 2">
				<view class="list-one-img">
					<image class="nx-img" mode="aspectFill" :src="newpos.img.url"></image>
				</view>
				<view class="list-one-data-w">
					<view class="list-one-title">
						{{ newpos.name }}
					</view>
					<view class="list-ona-abstract x-bc">
						<view>{{formatData(newpos.create_time) }}</view>
						<view>
							<image mode="aspectFill" src="/static/images/index/eye.png"
								style="height: 10px;width: 14px;margin-right: 10rpx;">
							</image>
							{{newpos.visit_cnt}}
						</view>
					</view>
				</view>
			</view>
			<block v-if="videoAd">
				<view style="width: 100%;padding: 0 20rpx;">
					<!--微信官方广告和Dcloud uniAd广告只能选择一个-->
					
					<!--微信官方广告-->
					<ad v-if="(index + 1) % 5 == 0" :unit-id="videoAd" ad-theme="white"></ad>
					
					<!--Dcloud uniAd广告-->
					<!-- <ad v-if="(index + 1) % 5 == 0" :adpid="videoAd" ad-theme="white"></ad> -->
				</view>
			</block>

		</block>
	</view>
</template>

<script>
	export default {
		name: 'nx-article-list',
		computed: {
			formatData() {
				return (time) => {
					const dataTime = this.$dayjs(time).format('YYYY-MM-DD');
					return dataTime
				}
			},
		},
		props: {
			type: {
				type: Number,
				default: 1 // 1左图右文，2大图
			},
			videoAd: {
				type: String,
			},
			articleList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {}
		},
		methods: {
			// 路由跳转
			jump(path, parmas) {
				this.$Router.push({
					path: path,
					query: parmas
				})
			},
			// 路由跳转
			routerTo(item) {
				this.jump('/pages/sub-index/articleDetail/index', {
					id: item.article_id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/style/mixin/text-overflow.scss';

	.menu-scroll-list {
		display: flex;
		padding: 30upx;
		background-color: #ffffff;
		margin: 20rpx;
		border-radius: 20upx;
	}

	.list-one-w {
		border-radius: 20upx;
		margin: 20rpx;
		overflow: hidden;
		background-color: #FFFFFF;
	}

	.menu-scroll-list-img {
		width: 360upx;
		height: 180upx;
		border-radius: 16upx;
		overflow: hidden;
	}

	.nx-img {
		width: 100%;
		height: 100%;
	}

	.menu-scroll-list-right {
		margin-left: 32upx;
		width: 420upx;
		display: flex;
		justify-content: space-between;
		flex-flow: column;
	}

	.menu-scroll-list-h {
		font-size: 26upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.menu-scroll-list-describe {
		color: #adadad;
		font-size: 20upx;
		// overflow: hidden;
		// text-overflow: ellipsis;
		// display: -webkit-box;
		// -webkit-line-clamp: 1;
		// -webkit-box-orient: vertical;
	}

	.list-one-data-w {
		margin: 28upx;
	}

	.list-ona-abstract {
		color: #adadad;
		font-size: 24upx;
		margin-top: 2upx;
	}

	.list-one-title {
		font-size: 28upx;
		border-radius: 0upx 0upx 20upx 20upx;
		margin-top: -10upx;
		padding: 10upx 0upx;
	}

	.list-one-img {
		height: 320upx;
		// border-radius: 20upx;
		overflow: hidden;
	}
</style>
