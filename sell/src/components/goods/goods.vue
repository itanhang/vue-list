<template>
  <div class="goods">
    <div class="menu-wraper" ref="menuWraper">
      <ul>
        <li v-for="(item, index) in goods" @click="selectMenu(index, $event)" :class="{'current': currentIndex==index}" class="menu-item">
          <span class="text"><span v-show="item.type > 0" :class="classMap[item.type]" class="icon"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wraper" ref="foodsWraper">
      <ul>
        <li v-for="item in goods" class="food-list Js-food-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" @click="selectFood(food, $event)" class="food-item">
              <div class="icon"><img :src="food.icon" width="57" height="57" alt=""></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="control-wraper">
                  <cart-control @add="addCart" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
    <food ref="food" :food="selectedFood" @add="addCart"></food>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import shopcart from "@/components/shopcart/shopcart";
import cartControl from "@/components/cartcontrol/cartcontrol";
import food from "@/components/food/food";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [], //商品层的高度
      scrollY: 0,
      selectedFood: {}
    };
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let h1 = this.listHeight[i];
        let h2 = this.listHeight[i + 1];
        if (!h2 || (this.scrollY >= h1 && this.scrollY < h2)) {
          return i;
        }
      }
      return 0;
    },
    selectFoods() {
      let foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  created() {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];

    this.axios.get("/api/goods").then(res => {
      res = res.data;
      if (res.errno === 0) {
        this.goods = res.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    });
  },
  methods: {
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWraper.getElementsByClassName(
        "Js-food-list"
      );
      let el = foodList[index];
      this.foodScroll.scrollToElement(el, 300);
    },
    selectFood(food, event){
      if(!event._constructed){
        return;
      }
      this.selectedFood = food;
      this.$refs.food.show();
    },
    addCart(target) {
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWraper, {
        click: true
      });
      this.foodScroll = new BScroll(this.$refs.foodsWraper, {
        probeType: 3,
        click: true
      });
      this.foodScroll.on("scroll", pos => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWraper.getElementsByClassName(
        "Js-food-list"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components: {
    shopcart,
    cartControl,
    food
  }
};
</script>

<style lang="less">
@import "../../common/less/mixin";
.goods {
  display: flex;
  position: absolute;
  top: 177px;
  bottom: 48px;
  width: 100%;
  overflow: hidden;
}
.menu-wraper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
  .menu-item {
    display: table;
    padding: 0 12px;
    width: 56px;
    height: 54px;
    line-height: 14px;
    .icon {
      display: inline-block;
      vertical-align: top;
      width: 12px;
      height: 12px;
      margin-right: 2px;
      background-size: 12px 12px;
      background-repeat: no-repeat;
      &.decrease {
        .bg-image("./images/decrease_3");
      }
      &.discount {
        .bg-image("./images/discount_3");
      }
      &.guarantee {
        .bg-image("./images/guarantee_3");
      }
      &.invoice {
        .bg-image("./images/invoice_3");
      }
      &.special {
        .bg-image("./images/special_3");
      }
    }
    .text {
      display: table-cell;
      vertical-align: middle;
      width: 56px;
      font-size: 12px;
      .border-1px(bottom; rgba(7,17,27,0.1));
    }
    &.current {
      position: relative;
      margin-top: -1px;
      z-index: 10;
      background: #fff;
      .text {
        font-weight: 500;
      }
      .text::after {
        display: none;
      }
    }
    &:last-child {
      .text::after {
        display: none;
      }
    }
  }
}
.foods-wraper {
  flex: 1;
  .title {
    padding-left: 14px;
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    border-left: 2px solid #d9dde1;
    background: #f3f5f7;
    color: rgb(147, 153, 159);
  }
  .food-item {
    display: flex;
    margin: 18px;
    padding-bottom: 18px;
    .border-1px(bottom; rgba(7,17,27,0.1));
    &:last-child {
      margin-bottom: 0;
      &::after {
        display: none;
      }
    }
    .icon {
      flex: 0 0 57px;
      width: 57px;
      height: 57px;
      margin-right: 10px;
    }
    .content {
      flex: 1;
      position: relative;
      .name {
        margin-bottom: 8px;
        width: 100%;
        line-height: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .desc,
      .extra {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
      .desc {
        margin-bottom: 8px;
        line-height: 12px;
      }
      .price {
        line-height: 24px;
        .now {
          margin-right: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(240, 20, 20);
        }
        .old {
          text-decoration: line-through;
          font-size: 10px;
          font-weight: 700;
          color: rgb(147, 153, 159);
        }
      }
      .control-wraper {
        position: absolute;
        right: 0;
        bottom: -5px;
      }
    }
  }
}
</style>
