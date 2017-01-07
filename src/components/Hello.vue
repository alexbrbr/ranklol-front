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
    <div>
      Most played role : {{numberOfMostPlayedRole}} matches as {{mostPlayedRole}}
    </div>
    <div>
      Most played day : {{numberOfMostPlayedDay}} matches on {{mostPlayedDay}}
    </div>
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
      results: {},
      summonerName: 'UOL Vizicsacsi'
    }
  },
  computed: {
    mostPlayedRole: function () {
      return this.results.rolesData && Object
        .keys(this.results.rolesData)
        .reduce((mostPlayed, curr) => {
          return this.results.rolesData[curr] > this.results.rolesData[mostPlayed]
            ? curr
            : mostPlayed
        })
    },
    numberOfMostPlayedRole: function () {
      return this.results.rolesData && this.results.rolesData[this.mostPlayedRole]
    },
    mostPlayedDay: function () {
      return this.results.daysData && Object
        .keys(this.results.daysData)
        .reduce((mostPlayed, curr) => {
          return this.results.daysData[curr] > this.results.daysData[mostPlayed]
          ? curr
          : mostPlayed
        })
    },
    numberOfMostPlayedDay: function () {
      return this.results.daysData && this.results.daysData[this.mostPlayedDay]
    }
  }
}
</script>

<style scoped>
</style>
