<template>
  <view>
    <nx-article-list :articleList="newList" />
    <view style="height: 80vh" class="x-c" v-if="newList.length == 0">
      <u-empty
        src="/static/images/common/nodata.png"
        icon-size="200"
      ></u-empty>
    </view>
  </view>
</template>
<script>
let cloudObjectCollect = uniCloud.importObject("app_collection");
export default {
  components: {},
  data() {
    return {
      newList: [],
    };
  },
  onShow() {
    if (this.$Route.query.openid) {
      this.collectionGet(this.$Route.query.openid);
    }
  },
  onUnload() {},
  methods: {
    collectionGet(user_id) {
      cloudObjectCollect
        .getCollection({
          user_id
        })
        .then((res) => {
          let tempDatas = [];
          res.forEach((x) => {
            let article = x.article[0];
            tempDatas.push(article);
          });
          this.newList = tempDatas;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
