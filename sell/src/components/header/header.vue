<template>
  <div class="header">
    <div class="header-hero">
      <div class="avatar"><img :src="seller.avatar" width="64" height="64" alt=""></div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">{{seller.description}} / {{seller.deliveryTime}}分钟送达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span>{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" @click="toggleDetail" v-if="seller.supports">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="header-notice" @click="toggleDetail">
      <span class="notice-title"></span><span class="notice-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wraper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrap">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title"><span>优惠信息</span></div>
            <ul v-if="seller.supports" class="supports">
              <li v-for="(item, index) in seller.supports" :key="index" class="support-item">
                <span :class="classMap[seller.supports[index].type]" class="icon"></span>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <div class="title"><span>商家公告</span></div>
            <div class="notice">
              <p>{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="toggleDetail"><i class="icon-close"></i></div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from "@/components/star/star";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    };
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
  },
  methods: {
    toggleDetail: function() {
      this.detailShow = !this.detailShow;
    }
  },
  components: {
    star
  }
};
</script>

<style lang="less">
@import "../../common/less/mixin";
.header {
  position: relative;
  overflow: hidden;
  background: rgba(7, 17, 27, 0.5);
  color: #fff;
  .background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      filter: blur(6px);
      transform: translateY(-30%) scale(1.05);
    }
  }
  .detail {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    transition: all 0.5s;
    background: rgba(7, 17, 27, 0.8);
    backdrop-filter: blur(10px);
    &.fade-enter,
    &.fade-leave-to {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }
  }
  .detail-wraper {
    width: 100%;
    min-height: 100%;
  }
  .detail-main {
    margin-top: 64px;
    padding: 0 10%;
    padding-bottom: 64px;
    .name {
      line-height: 16px;
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
    .star-wrap {
      margin-top: 18px;
      padding: 2px 0;
      text-align: center;
    }
    .title {
      display: flex;
      align-items: center;
      margin: 30px 0 24px;
      &::before,
      &::after {
        content: "";
        flex: 1;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        transform: scaleY(0.5);
      }
      span {
        padding: 0 12px;
        font-size: 14px;
        font-weight: 700;
      }
    }
    .support-item {
      margin-bottom: 12px;
      padding: 0 12px;
      font-size: 0;
      &:last-child {
        margin-bottom: 0;
      }
      .icon {
        display: inline-block;
        margin-right: 6px;
        width: 16px;
        height: 16px;
        vertical-align: top;
        background-size: 16px 16px;
        background-repeat: no-repeat;
        &.decrease {
          .bg-image("./images/decrease_2");
        }
        &.discount {
          .bg-image("./images/discount_2");
        }
        &.guarantee {
          .bg-image("./images/guarantee_2");
        }
        &.invoice {
          .bg-image("./images/invoice_2");
        }
        &.special {
          .bg-image("./images/special_2");
        }
      }
      .text {
        line-height: 16px;
        font-size: 12px;
      }
    }
    .notice {
      padding: 0 12px;
      line-height: 24px;
      font-size: 12px;
    }
  }
  .detail-close {
    position: relative;
    margin: -64px auto 0;
    width: 32px;
    height: 32px;
    font-size: 32px;
    clear: both;
  }
}
.header-hero {
  display: flex;
  position: relative;
  padding: 24px 12px 18px 24px;
  .avatar {
    margin-right: 16px;
    img {
      border-radius: 2px;
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    .title {
      margin: 2px 0 8px 0;
      line-height: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .brand {
        display: inline-block;
        vertical-align: top;
        margin-right: 2px;
        width: 30px;
        height: 18px;
        background-size: 30px 18px;
        background-repeat: no-repeat;
        .bg-image("./images/brand");
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .desc {
      margin-top: 8px;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .support {
      margin: 10px 60px 0 0;
      font-size: 10px;
      line-height: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          .bg-image("./images/decrease_1");
        }
        &.discount {
          .bg-image("./images/discount_1");
        }
        &.guarantee {
          .bg-image("./images/guarantee_1");
        }
        &.invoice {
          .bg-image("./images/invoice_1");
        }
        &.special {
          .bg-image("./images/special_1");
        }
      }
    }
  }
  .support-count {
    position: absolute;
    right: 12px;
    bottom: 16px;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    font-size: 0;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
    overflow: hidden;
    .count {
      display: inline-block;
      vertical-align: top;
      font-size: 10px;
    }
    i {
      display: inline-block;
      line-height: 24px;
      font-size: 10px;
    }
  }
}
.header-notice {
  position: relative;
  padding: 0 22px 0 12px;
  height: 28px;
  line-height: 28px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background: rgba(7, 17, 27, 0.2);
  .notice-title {
    display: inline-block;
    vertical-align: top;
    margin-top: 8px;
    width: 22px;
    height: 12px;
    .bg-image("./images/bulletin");
    background-size: 22px 12px;
    background-repeat: no-repeat;
  }
  .notice-text {
    vertical-align: top;
    margin: 0 4px;
    font-size: 10px;
  }
  i {
    position: absolute;
    top: 8px;
    right: 12px;
    height: 12px;
    line-height: 12px;
    font-size: 10px;
  }
}
</style>
