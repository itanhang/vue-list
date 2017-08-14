<template>
  <div id="app">
    <div v-if="defaultContent">
      <img src="./assets/logo.png">
      <hello></hello>
    </div>
    <todolist v-bind:appTitle="title"></todolist>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Todolist from './components/todolist'

export default {
  name: 'app',
  data () {
    return {
      defaultContent: false,
      title: 'App to todolist'
    }
  },
  components: {
    Hello, Todolist
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
