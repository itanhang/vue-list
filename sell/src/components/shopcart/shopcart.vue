<template>
<div>
  <div class="shopcart">
    <div class="content">
      <div class="shopcart-left" @click="toggleList">
        <div class="icon-wraper">
          <div :class="{'active': totalCount > 0}" class="icon">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="count" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'active': totalPrice > 0}">￥{{totalPrice}}</div>
        <div class="desc" v-show="deliveryPrice > 0">另需配送费{{deliveryPrice}}元</div>
      </div>
      <div class="shopcart-right" @click="pay">
        <div :class="payClass" class="pay">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for="ball in balls">
        <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
          <div v-show="ball.show" class="ball">
            <div class="inner"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h3 class="title">购物车</h3>
          <div class="empty" @click="emptyCart">清空</div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="food in selectFoods">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="control-wraper">
                <cart-control @add="addCart" :food="food"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
  <transition name="fade">
    <div class="list-mask" v-show="listShow" @click="toggleList"></div>
  </transition>
</div>
</template>

<script>
import BScroll from "better-scroll";
import cartControl from "@/components/cartcontrol/cartcontrol";

export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: [],
      fold: true
    };
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.price * food.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.selectFoods.forEach(food => {
        count += food.count;
      });
      return count;
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice;
        return `还差￥${diff}起送`;
      } else {
        return "去结算";
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return "not-enough";
      } else {
        return "enough";
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      }
      return show;
    }
  },
  methods: {
    pay() {
      if (this.totalPrice < this.minPrice) {
        return;
      }
      let payPrice = this.totalPrice + this.deliveryPrice;
      window.alert(`支付${payPrice}元`);
    },
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    emptyCart() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    addCart(target) {
      this.drop(target);
    },
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          ball.el = el;
          this.dropBalls.push(ball);
          return;
        }
      }
    },
    beforeDrop(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22);
          el.style.display = "";
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.getElementsByClassName("inner")[0];
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    dropping(el, done) {
      let rf = el.offsetHeight;
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.getElementsByClassName("inner")[0];
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done);
      });
    },
    afterDrop(el) {
      let ball = this.dropBalls.shift();
      if (ball) {
        ball.show = false;
        el.style.display = "none";
      }
    }
  },
  components: {
    cartControl
  }
};
</script>

<style lang="less">
@import "../../common/less/mixin";
.shopcart {
  position: fixed;
  z-index: 50;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    height: 100%;
    background: #141d27;
  }
}
.shopcart-left {
  flex: 1;
  font-size: 0;
  .icon-wraper {
    display: inline-block;
    position: relative;
    top: -10px;
    margin: 0 12px;
    padding: 6px;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #141d27;
    box-sizing: border-box;
    vertical-align: top;
    .icon {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #2b343c;
      text-align: center;
      &.active {
        background: rgb(0, 160, 220);
        .icon-shopping_cart {
          color: #fff;
        }
      }
    }
    .icon-shopping_cart {
      font-size: 24px;
      line-height: 44px;
      color: #80858a;
    }
    .count {
      position: absolute;
      top: 0;
      right: 0;
      width: 24px;
      height: 16px;
      font-size: 9px;
      font-weight: 700;
      line-height: 16px;
      border-radius: 16px;
      text-align: center;
      color: #fff;
      background: rgb(240, 20, 20);
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    }
  }
  .price,
  .desc {
    display: inline-block;
    vertical-align: top;
    margin-top: 12px;
    line-height: 24px;
    color: rgba(255, 255, 255, 0.4);
  }
  .price {
    padding-right: 12px;
    font-size: 16px;
    font-weight: 700;
    box-sizing: border-box;

    &.active {
      color: #fff;
    }
  }
  .desc {
    padding-left: 12px;
    font-size: 10px;
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
}
.shopcart-right {
  flex: 0 0 105px;
  width: 105px;
  .pay {
    height: 48px;
    line-height: 48px;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.4);
    background: #2b333b;
    &.enough {
      background: #00b43c;
      color: #fff;
    }
  }
}
.ball-container {
  .ball {
    position: fixed;
    left: 32px;
    bottom: 22px;
    z-index: 200;
    transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    .inner {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: rgb(0, 160, 220);
      transition: all 0.4s linear;
    }
  }
}
.shopcart-list {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  transform: translate3d(0, -100%, 0);
  &.fold-enter-active,
  &.fold-leave-active {
    transition: all 0.5s;
  }
  &.fold-enter,
  &.fold-leave-to {
    transform: translate3d(0, 0, 0);
  }
  .list-header {
    height: 40px;
    line-height: 40px;
    padding: 0 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    background: #f3f5f7;
    .title {
      float: left;
      font-size: 14px;
      font-weight: 500;
      color: rgb(7, 17, 27);
    }
    .empty {
      float: right;
      font-size: 12px;
      color: rgb(0, 160, 220);
    }
  }
  .list-content {
    padding: 0 18px;
    max-height: 217px;
    overflow: hidden;
    background: #fff;
    .food {
      display: flex;
      align-items: center;
      padding: 12px 0;
      box-sizing: border-box;
      .border-1px(bottom, rgba(7,17,27,0.1));
      .name {
        flex: 1;
        font-size: 14px;
        color: rgb(7, 17, 27);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .price {
        margin: 0 10px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
      }
    }
  }
}
.list-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  backdrop-filter: blur(2px);
  background: rgba(7, 17, 27, 0.6);
  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.5s;
  }
  &.fade-enter,
  &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
}
</style>
