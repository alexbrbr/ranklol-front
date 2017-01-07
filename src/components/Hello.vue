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
    <div class="cards-list">
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
      <role-card
       v-bind:role-name="mostPlayedRole"
       v-bind:games-number-in-role="numberOfMostPlayedRole"
       v-bind:total-games-number="results.matchIds && results.matchIds.length">
      </role-card>
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
    Ranklol isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
  </div>
</template>

<script>
import axios from 'axios'
import RoleCard from './RoleCard'

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
  components: {
    RoleCard
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

  .cards-list {
    display: flex;
    margin: 1rem;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
