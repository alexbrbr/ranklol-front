<template>
  <div id="app">
    <lolrank-header></lolrank-header>
    <hello></hello>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Header from './components/lolrank-header'

export default {
  name: 'app',
  components: {
    Hello,
    'lolrank-header': Header
  }
}
</script>

<style>
/*
#AD343E pink
#000000 black
#0D1B2A blue
#BA1200 red
#F0EDEE white
*/
body {
  margin: 0 !important;
  padding: 0 !important;
}
#app {
  display: flex;
  flex-direction: column;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
