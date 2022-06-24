<template>
  <view class="goods-item" @click="gotoDetails">
    <view class="img-box">
      <image class="img" mode="aspectFill" :src="item.head_img[0]"></image>
    </view>
    <view class="info">
      <view class="title">{{ item.title }}</view>
      <text class="price">￥{{ item.min_price / 100 }}</text>
    </view>
  </view>
</template>

<script>
export default {
  name: 'nx-goods-item',
  props: {
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {}
  },
  methods: {
    gotoDetails() {
      const productId = [this.item.product_id]
      wx.navigateTo({
        url: `plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=${productId}`
      })
    }
  }
}
</script>

<style>
.goods-item {
  background: #fff;
  border-radius: 16rpx;
  overflow: hidden;
}

.img-box {
  position: relative;
}

.img {
  display: block;
  height: 360rpx;
  width: 100%;
}

.img-box .share {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0 0 48rpx 0;
  color: #fff;
  font-size: 10px;
  height: 48rpx;
  left: 0;
  line-height: 48rpx;
  padding: 0 30rpx 0 10rpx;
  position: absolute;
  top: 0;
}

.info {
  padding: 20rpx;
}

.title {
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #333;
  display: -webkit-box;
  font-size: 14px;
  height: 88rpx;
  margin-bottom: 8rpx;
  overflow: hidden;
  text-overflow: ellipsis;
}

.price {
  color: #fe645a;
  font-size: 16px;
  font-weight: 500;
}

.video {
  align-items: center;
  color: #333;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
}

.video .btn {
  border: 1rpx solid #ccc;
  border-radius: 32rpx;
  color: #666;
  height: 60rpx;
  line-height: 60rpx;
  padding: 0 26rpx;
}
</style>
