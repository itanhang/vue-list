<template>
  <div id="app">
    <seller-header :seller="seller"></seller-header>
    <div class="tabbar">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "@/components/header/header";
export default {
  name: "App",
  data() {
    return {
      seller: {}
    };
  },
  created() {
    this.axios.get("/api/seller").then(res => {
      res = res.data;
      if (res.errno == 0) {
        this.seller = res.data;
      }
    });
  },
  components: {
    sellerHeader: Header
  }
};
</script>

<style lang="less">
@import './common/less/mixin';
@import './common/less/index';
.tabbar {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .border-1px(bottom,rgba(7, 17, 27, 0.1));
  .tab-item {
    flex: 1;
    text-align: center;
    a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active {
        color: rgb(240, 20, 20);
      }
    }
  }
}
</style>
