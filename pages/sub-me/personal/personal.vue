<template>
	<view>
		
		<view class="person">
			
			<view class="x-bc" style="padding: 27rpx;" @click="toHeadimg">
				<view>头像</view>
				<view class="x-c">
					<image class="headimg"
						:src="member.user_headimg || '/static/images/me/base_avatar.png'"></image>
					<u-icon color="#c0c0c0" name="arrow-right"></u-icon>
					
				</view>
			</view>
			
			
			<view class="x-bc" style="padding: 27rpx;" @click="toName" data-target="Modal">
				<view>昵称</view>
				<view class="x-c">
					<text class="text">{{member.user_nickname}}</text>
					<u-icon color="#c0c0c0" name="arrow-right"></u-icon>
				</view>
			</view>
			
			
			
			<picker @change="toGender" :value="index" :range="picker">
				<view class="x-bc" style="padding: 27rpx;">
					<view>性别</view>
					<view class="x-c">
						<text class="text">{{member.user_gender == 0 ? '未知' : member.user_gender == 1 ? '男' : '女'}}</text>
						<u-icon color="#c0c0c0" name="arrow-right"></u-icon>
					</view>
				</view>
			</picker>
			
			
		</view>

		<l-clipper v-if="clipperShow" :image-url="member.user_headimg" :quality="0.6" @success="clipperSuccess"
			@cancel="clipperShow = false"></l-clipper>
			
		<view class="cu-modal"  :class="modalName?'show':''">
			<view class="cu-dialog" style="background-color: #ffff;">
				<view class="cu-bar bg-white justify-end">
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view style="padding: 0 100rpx 100rpx;" class="bg-white">
					<view class="title x-bc">
						<text>修改昵称</text>
						<text>{{value.length}}/26</text>
					</view>
					<u--input
					   placeholder="请输入"
					   v-model="value"
					   :clearable="true"
					   maxlength="26"
					   customStyle="background-color: #f5f7fa;padding:12rpx"
					   border="none"
					 ></u--input>
					 <view class="btn" @click="editConfirm">
					 	提交
					 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let cloudObjectMember = uniCloud.importObject('app_member')
	import {
		mapState,
		mapMutations
	} from 'vuex'
	
	import lClipper from '@/pages/sub-me/components/lime-clipper/components/l-clipper/l-clipper';
	
	export default {
		components: {
			lClipper
		},
		computed: {
			...mapState(['islogin', 'member'])
		},
		data() {
			return {
				value:'',
				modalName: false,
				index: 0,
				picker: ['男', '女'],
				clipperShow: false,
			};
		},
		onShow() {
			this.loadData()
		},
		methods: {
			...mapMutations(['logout', 'putMember']),
			loadData() {
				let that = this
				let uid = uniCloud.getCurrentUserInfo().uid
				cloudObjectMember.getData(uid).then(res => {
					that.putMember(res.member)
				})
			},
			hideModal() {
				this.modalName = false
			},
			toName() {
				this.modalName = true
			},
			toGender(e) {
				this.index = e.detail.value
				let tempIndex = parseInt(this.index)+1
				this.updateUser({
					user_gender: tempIndex
				});
			},
			toHeadimg(res) {
				this.clipperShow = true;
			},
			async clipperSuccess(e) {
				let url = e.url;
				uni.showLoading({
					title: '上传中'
				})
				
				const uRes = await this.$tools.uploadFile(url, `${Date.now()}.png`)
					.catch(err => {
						this.$tools.msg(err.message);
						uni.hideLoading();
					});
				
				this.updateUser({
					user_headimg: uRes.url
				});
				
				try {
					URL.revokeObjectURL(url)
				} catch {}
			},
			editConfirm() {
				if (this.value.length==0) {
					this.$tools.msg('请填写昵称');
					return;
				}
				this.updateUser({
					user_nickname: this.value
				});
			},
			
			updateUser(data) {
					cloudObjectMember.updateUser({
						id: this.member._id,
						updateObject: data,
					}).then((res) => {
						uni.hideLoading()
						this.clipperShow = false
						this.modalName = false
						this.loadData()
					}).catch((err) => {
						uni.hideLoading()
						uni.showModal({
							content: `更新操作执行失败，错误信息为：${err.message}`,
							showCancel: false
						})
						console.error(err)
					})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background: #f5f5f5;
	}
	.person{
		margin: 20rpx;
		background: #fff;
		border-radius: 20rpx;
	}
	.headimg{
		border-radius: 50%;
		width: 60rpx; height: 60rpx;
		margin-right: 20rpx;
	}
	
	.text{
		color: #c0c0c0;
		margin-right: 20rpx;
		font-size: 24rpx;
	}
	
	.title{
		padding: 30rpx 10rpx;
		color: #c0c0c0;
		font-size: 24rpx;
	}
	
	.btn{
		margin-top: 40rpx;
		border-radius: 50rpx;
		text-align: center;
		background: #f4cf89;
		color: #fff;
		padding: 20rpx;
	}
</style>
