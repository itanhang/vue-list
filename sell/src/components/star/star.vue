<template>
  <div class="star" :class="starType">
    <span v-for="(item, index) in items" :class="item" :key="index" class="star-item"></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = "on";
const CLS_HALF = "half";
const CLS_OFF = "off";

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return "star-" + this.size;
    },
    items() {
      let result = [];
      let score = Math.floor(this.score * 2) / 2;
      let hasDecimal = score % 1 !== 0;
      let integer = Math.floor(score);
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON);
      }
      if (hasDecimal) {
        result.push(CLS_HALF);
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF);
      }
      return result;
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/mixin";
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
  }
  &.star-48 {
    .star-item {
      margin-right: 22px;
      width: 20px;
      height: 20px;
      background-size: 20px 20px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image("./images/star48_on");
      }
      &.half {
        .bg-image("./images/star48_half");
      }
      &.off {
        .bg-image("./images/star48_off");
      }
    }
  }
  &.star-36 {
    .star-item {
      margin-right: 6px;
      width: 15px;
      height: 15px;
      background-size: 15px 15px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image("./images/star36_on");
      }
      &.half {
        .bg-image("./images/star36_half");
      }
      &.off {
        .bg-image("./images/star36_off");
      }
    }
  }
  &.star-24 {
    .star-item {
      margin-right: 3px;
      width: 10px;
      height: 10px;
      background-size: 10px 10px;
      &:last-child {
        margin-right: 0;
      }
      &.on {
        .bg-image("./images/star24_on");
      }
      &.half {
        .bg-image("./images/star24_half");
      }
      &.off {
        .bg-image("./images/star24_off");
      }
    }
  }
}
</style>
