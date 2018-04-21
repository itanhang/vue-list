<template>
  <div class="cart-control">
    <transition name="move">
      <div class="decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart">
        <span class="icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">{{food.count}}</div>
    <div class="plus">
      <span class="icon-add_circle" @click.stop.prevent="addCart"></span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
      this.$emit('add', event.target);
    },
    decreaseCart() {
      if (this.food.count) {
        this.food.count--;
      }
    }
  }
};
</script>

<style lang="less">
.cart-control {
  font-size: 0;
  .decrease,
  .plus {
    display: inline-block;
    padding: 6px;
    span {
      display: block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
  .decrease {
    &.move-enter,
    &.move-leave-to {
      opacity: 0;
      transform: translate3d(24px, 0, 0);
      span {
        transform: rotate(180deg);
      }
    }
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.4s linear;
      span {
        transition: all 0.4s linear;
      }
    }
  }
  .count {
    display: inline-block;
    vertical-align: top;
    padding: 6px 0;
    width: 14px;
    height: 24px;
    line-height: 24px;
    font-size: 10px;
    text-align: center;
    color: rgb(147, 153, 159);
  }
}
</style>
