<template>
  <div>
    <md-card class="card-margin">
      <md-whiteframe>
      <md-card-header>
        <div class="md-title">Choose which summoner's ranked games you want to see</div>
        <div class="md-subhead">Only ranked games from Season 7 in EUW will be loaded</div>
      </md-card-header>
    </md-whiteframe>

      <md-card-content>
        <md-input-container class="summoner-name-input">
          <label>Summoner name</label>
          <md-input v-model="summonerName"></md-input>
        </md-input-container>
        <md-button class="md-raised md-primary"
         v-on:click="loadSummonerData">
         Load summoner data
        </md-button>
      </md-card-content>
    </md-card>

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
      summonerName: ''
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
  .card-margin {
    margin: 1rem;
  }

  .summoner-name-input {
    max-width: 10rem;
    margin: 0 auto 0.5rem;
  }
</style>
