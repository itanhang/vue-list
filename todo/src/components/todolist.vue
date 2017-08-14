<template>
  <div class="todolist">
      <h1>{{appTitle || title}}</h1>
      <input type="text" placeholder="Add todo" v-model="newItem" v-on:keyup.enter="addItem">
      <ul>
          <li v-for="item in items" v-bind:class="{active : item.isFinished}" v-on:click="toggleFinish(item)">{{item.label}}</li>
      </ul>
  </div>
</template>

<script>
import Store from '../store.js'

export default {
  name: 'todolist',
  data () {
    return {
        title: 'Todolist Demo',
        items: Store.get(),
        newItem: ''
    }
  },
  props: ['appTitle'],
  methods: {
      toggleFinish: function (item) {
          item.isFinished = !item.isFinished
      },
      addItem:function () {
          if (this.newItem) {
            this.items.push({
                label: this.newItem,
                isFinished: false
            })
            this.newItem = ''
          }
      }
  },
  watch: {
      items: {
          handler: function (items) {
            Store.set(items)
          },
          deep: true
      }
  }
}
</script>

<style scoped>
.todolist {
    margin-top: 30px;
}
h1 {
    font-size: 30px;
    font-weight: lighter;
}
input {
   box-sizing: border-box;
    background: #f8f8f8;
    border: 1px solid #eee;
    padding: 8px;
    width: 320px;
    line-height: 26px;
}
ul {
    margin: 20px 0 0;
    padding: 0;
}
li {
   box-sizing: border-box;
   display: block;
   width: 320px;
   font-size: 14px;
   line-height: 35px;
   margin: 0 auto;
   color: #666;
   text-align: left;
   padding: 0 10px;
   margin-top: 10px;
   cursor: pointer;
   border: 1px dashed #666;
   border-radius: 3px;
}
li.active {
    border-style: solid;
    border-color: #5cb85c;
    color: #5cb85c;
    cursor: auto
}
</style>
