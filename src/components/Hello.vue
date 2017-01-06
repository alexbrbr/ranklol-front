<template>
  <div>
    <md-input-container>
      <label>Summoner name</label>
      <md-input v-model="summonerName"></md-input>
    </md-input-container>
    <button
     type="button"
     v-on:click="loadSummonerData">
     Load summoner data
    </button>
    <div v-if="!results">
      Loading
    </div>
    <div v-else>
      {{results}}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

function fetchSummoner (summonerName) {
  return axios.get(`http://localhost:4000/api/${summonerName}`)
}
export default {
  name: 'hello',
  created () {
    fetchSummoner(this.summonerName).then(results => {
      this.results = results.data
    })
  },
  methods: {
    loadSummonerData () {
      fetchSummoner(this.summonerName).then(results => {
        this.results = results.data
      })
    }
  },
  data () {
    return {
      results: null,
      summonerName: 'UOL Vizicsacsi'
    }
  }
}
</script>

<style scoped>
</style>
