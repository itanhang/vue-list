<template>
  <div class="ratingselect">
      <div class="rating-type">
          <span @click="select(2,$event)" :class="{'active': selectType === 2}" class="block positive">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
          <span @click="select(0,$event)" :class="{'active': selectType === 0}" class="block positive">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
          <span @click="select(1,$event)" :class="{'active': selectType === 1}" class="block negative">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
      </div>
      <div @click="toggleContent" :class="{'on': onlyContent}" class="rating-switch">
          <span class="icon-check_circle"></span>
          <span class="text">只看有内容的评价</span>
      </div>
  </div>
</template>

<script>
const POSITIVE = 0;
const NEGATIVE = 1;
const ALL = 2;
export default {
  props: {
    ratings: {
      type: Array,
      default() {
        return [];
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default() {
        return {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        };
      }
    }
  },
  computed: {
    positives() {
      return this.ratings.filter(rating => {
        return rating.rateType === POSITIVE;
      });
    },
    negatives() {
      return this.ratings.filter(rating => {
        return rating.rateType === NEGATIVE;
      });
    }
  },
  methods: {
    select(type, event) {
      if (!event._constructed) {
        return;
      }
      this.$emit("select", type);
    },
    toggleContent(event) {
      if (!event._constructed) {
        return;
      }
      this.$emit('toggle');
    }
  }
};
</script>

<style lang="less">
@import "../../common/less/mixin";
.rating-type {
  margin: 0 18px;
  padding: 18px 0;
  font-size: 0;
  .border-1px(bottom, rgba(7,17,27,0.1));
  .block {
    display: inline-block;
    padding: 8px 12px;
    margin-right: 8px;
    border-radius: 1px;
    font-size: 12px;
    color: rgb(77, 85, 93);
    .count {
      margin-left: 2px;
      line-height: 16px;
      font-size: 8px;
    }
    &.active {
      color: #fff;
    }
    &.positive {
      background: rgba(0, 160, 220, 0.2);
      &.active {
        background: rgb(0, 160, 220);
      }
    }
    &.negative {
      background: rgba(77, 85, 93, 0.2);
      &.active {
        background: rgb(77, 85, 93);
      }
    }
  }
}
.rating-switch {
  padding: 12px 18px;
  line-height: 24px;
  font-size: 0;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  color: rgb(147, 153, 159);
  &.on {
    .icon-check_circle {
      color: #00c850;
    }
  }
  .icon-check_circle {
    display: inline-block;
    vertical-align: top;
    margin-right: 4px;
    font-size: 24px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    font-size: 12px;
  }
}
</style>
