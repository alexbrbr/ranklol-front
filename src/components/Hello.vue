<template>
  <div class='view'>
    <md-card class="card-margin">
      <md-whiteframe>
        <md-card-header>
          <div class="md-title">Choose which summoner's ranked games you want to see</div>
          <div class="md-subhead">Only ranked games from Season 6, PreSeason 7 & Season 7 in EUW will be loaded</div>
        </md-card-header>
      </md-whiteframe>

      <md-card-content class="summoner-choosing-container">
        <div class="summoner-choosing-container__input">
          <md-input-container class="summoner-name-input">
            <label>Summoner name</label>
            <md-input v-model="summonerName"></md-input>
          </md-input-container>
          <md-button class="md-raised md-primary"
           v-on:click="loadSummonerData(summonerName)">
           Load summoner data
          </md-button>
        </div>
        <div class="summoner-choosing-container__examples">
          Or look at the stats from one of these players :
          <md-button class="md-raised md-primary"
           v-on:click="loadSummonerData('UOL Vizicsacsi')">
           UOL Vizicsacsi
          </md-button>
          <md-button class="md-raised md-primary"
           v-on:click="loadSummonerData('FNC Rekkles')">
           FNC Rekkles
          </md-button>
        </div>
      </md-card-content>
    </md-card>
    <div class="results">
      <md-spinner
       v-if="loading"
       md-indeterminate>
      </md-spinner>
      <div v-if="!results.matchIds && !results.errMessage">
        Please select a summoner
      </div>
      <div v-else-if="results.errMessage">
        {{this.results.errMessage}}
      </div>
      <div v-else>
        <div class="cards-list">
          <role-card
           v-bind:role-name="mostPlayedRole"
           v-bind:games-number-in-role="numberOfMostPlayedRole"
           v-bind:total-games-number="results.matchIds && results.matchIds.length">
          </role-card>
          <day-card
           v-bind:day-name="mostPlayedDay"
           v-bind:games-number-in-day="numberOfMostPlayedDay"
           v-bind:total-games-number="results.matchIds && results.matchIds.length">
          </day-card>
          <day-of-week-card
           v-bind:day-of-week-name="mostPlayedDayOfWeek"
           v-bind:games-number-in-day-of-week="numberOfMostPlayedDayOfWeek"
           v-bind:total-games-number="results.matchIds && results.matchIds.length">
         </day-of-week-card>
        </div>
        <champion-list
         v-bind:match-ids="results.matchIds"
         v-bind:champion-list="results.championData"
         v-bind:champions="champions">
        </champion-list>
      </div>
    </div>
    <div class="footer">
      Ranklol isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import RoleCard from './RoleCard'
import DayCard from './DayCard'
import DayOfWeekCard from './DayOfWeekCard'
import ChampionList from './ChampionList'

let apiUrl = ''
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:4000/api'
} else if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://ranklol-server.herokuapp.com/api'
}

function fetchSummoner (summonerName) {
  return axios.get(`${apiUrl}/summoner/${summonerName}`)
}
function fetchChampions () {
  return axios.get(`${apiUrl}/champions`) // eslint-disable-line
}
export default {
  name: 'hello',
  created () {
    fetchChampions().then(championsRes => {
      this.champions = championsRes.data
    })
  },
  components: {
    RoleCard,
    DayCard,
    ChampionList,
    DayOfWeekCard
  },
  methods: {
    loadSummonerData (name) {
      if (this.loading) {
        return
      }
      this.loading = true
      fetchSummoner(name)
        .then(results => {
          this.results = results.data
          this.loading = false
        })
        .catch(err => {
          this.results = err.response.data
          this.loading = false
        })
    }
  },
  data () {
    return {
      results: {},
      summonerName: '',
      loading: false
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
    },
    mostPlayedDayOfWeek: function () {
      return this.results.daysOfWeekData && Object
        .keys(this.results.daysOfWeekData)
        .reduce((mostPlayed, curr) => {
          return this.results.daysOfWeekData[curr] > this.results.daysOfWeekData[mostPlayed]
          ? curr
          : mostPlayed
        })
    },
    numberOfMostPlayedDayOfWeek: function () {
      return this.results.daysOfWeekData && this.results.daysOfWeekData[this.mostPlayedDayOfWeek]
    }
  }
}
</script>

<style scoped>
  .view {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
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

  .results {
    flex: 1;
  }

  .footer {
    margin: 1rem 1rem 0;
    font-size: 11px;
  }

  .summoner-choosing-container {
    display: flex;
  }
  .summoner-choosing-container__input {
    flex: 1;
  }
  .summoner-choosing-container__examples {
    flex: 1;
  }
</style>
