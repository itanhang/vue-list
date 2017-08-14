new Vue({
    el: "#cart",
    data: {
        productList: [],
        isCheckAll: false,
        mdShow: false,
        tempIndex: -1
    },
    filters: {
        formatMoney: function(value, num = 2) {
            return "￥" + value.toFixed(num);
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.init();
        });
    },
    computed: {
        // 监听总金额
        totalMoney: function() {
            var total = 0;
            this.productList.forEach(function(item){
                if(item.checked) {
                    total += item.price * item.quentity;
                }
            });
            return total;
        }
    },
    methods: {
        init: function() {
            var self = this;
            // 获取购物车商品。判断是否有checked并计算总金额，否则添加并默认设置false
            this.$http.get("data/cart.json",{"user":1}).then(function(res) {
                self.productList = res.body.result.list;
                self.productList.forEach(function(item){
                    if (typeof item.checked == 'undefined'){
                        self.$set(item, 'checked', false);
                    }
                });
            });
        },
        isAll: function() {
            // 判断是否选择了所有，设置全选为true
            for (i in this.productList) {
                if (!this.productList[i].checked){
                    return;
                }
            }
            this.isCheckAll = true;
        },
        changeQuentity: function(item, way) {
            item.quentity <= 1 && way < 0 ? item.quentity = 1 : item.quentity += way;
            item.checked = true;
            this.isAll();
        },
        checkProduct: function(item, event) {
            // event.preventDefault();
            item.checked = !item.checked;
            if (item.checked) {
                this.isAll();
            }else {
                this.isCheckAll = false;
            }
        },
        checkAll: function(flag) {
            // flag : true全选 false取消
            flag ? this.isCheckAll = !this.isCheckAll : this.isCheckAll = flag;
            this.productList.forEach(function(item, index) {
                item.checked = this.isCheckAll;
            }, this);
        },
        checkDel: function(index) {
            this.tempIndex = index;
            this.mdShow = true;
        },
        confirmDel: function() {
            // this.$delete(this.productList, this.tempIndex);
            this.productList.splice(this.tempIndex, 1);
            this.mdShow = false;
            this.isAll();
        },
        checkout: function(event) {
            var btn = event.currentTarget; // 当前元素
            btn.innerHTML = '结账中...';
            var items = this.productList,
            data = items.filter(function(item){ // 筛选选中的商品
                return item.checked;
            });
            console.log(JSON.stringify(data));
        }
    }
});