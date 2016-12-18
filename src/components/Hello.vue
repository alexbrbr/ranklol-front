<template>
  <div v-if="!results">
    Loading
  </div>
  <div v-else>
    {{results}}
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'hello',
  created () {
    axios.get('https://ranklol-server.herokuapp.com/api/Elwanna')
      .then(results => {
        this.results = results.data
      })
  },
  data () {
    return {
      results: null
    }
  }
}
</script>

<style scoped>
</style>
