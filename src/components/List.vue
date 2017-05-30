<template>
  <div class='view'>
    <md-card class="card-margin">
      <md-whiteframe>
        <md-card-header>
          <div class="md-title">Look at ranked games from any summoner in EUW</div>
          <div class="md-subhead">Only solo queue ranked games from Season 7 in EUW will be loaded</div>
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
           Load ranked games
          </md-button>
        </div>
        <div class="summoner-choosing-container__examples">
          Or look at the stats from one of these players :
          <div>
            <md-card class="player-description">
              Faker
              <div class="player-picture picture--faker">
              </div>
              <div>
                <img src="~assets/Kr.png"/>
              </div>
              Team: SKT T1
              <md-button class="md-raised md-primary load-button"
               v-on:click="loadSummonerData('Hide on bush', 'kr')">
                Load games
              </md-button>
            </md-card>
            <md-card class="player-description">
              Hans Sama
              <div class="player-picture picture--hans">
              </div>
              <div>
                <img src="~assets/Fr.png"/>
              </div>
              Team: Misfits
              <md-button class="md-raised md-primary load-button"
               v-on:click="loadSummonerData('MSF Hans sama1')">
                Load games
              </md-button>
            </md-card>
            <md-card class="player-description">
              Rekkles
              <div class="player-picture picture--rekkles">
              </div>
              <div>
                <img src="~assets/Se.png"/>
              </div>
              Team: Fnatic
              <md-button class="md-raised md-primary load-button"
               v-on:click="loadSummonerData('FNC Rekkles')">
                Load games
              </md-button>
            </md-card>
          </div>
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
        <!-- <div class="cards-list">
          <role-card
           v-bind:role-name="mostPlayedRole"
           v-bind:games-number-in-role="numberOfMostPlayedRole"
           v-bind:total-games-number="totalGamesNumber">
          </role-card>
          <day-card
           v-bind:day-name="mostPlayedDay"
           v-bind:games-number-in-day="numberOfMostPlayedDay"
           v-bind:total-games-number="totalGamesNumber">
          </day-card>
          <day-of-week-card
           v-bind:day-of-week-name="mostPlayedDayOfWeek"
           v-bind:games-number-in-day-of-week="numberOfMostPlayedDayOfWeek"
           v-bind:total-games-number="totalGamesNumber">
          </day-of-week-card>
          <champion-card
           v-for="(champion, index) in championsOrdered"
           v-bind:champion-id="champion.id"
           v-bind:games-number-for-champion="champion.numberOfTimesPlayed"
           v-bind:champions="champions"
           v-bind:index="index"
           v-bind:total-games-number="totalGamesNumber">
         </champion-card>
       </div> -->
       <win-details
        v-bind:champions="champions"
        v-bind:summoner-name="summonerName"
        v-bind:win-details="winDetails"
        v-bind:whole-win-details="wholeWinDetails">
       </win-details>
      </div>
    </div>
    <div class="footer">
      Ranklol isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.
    </div>
  </div>
</template>

<script>
let apiUrl = ''
if (process.env.NODE_ENV === 'development') {
  apiUrl = 'http://localhost:4000/api'
} else if (process.env.NODE_ENV === 'production') {
  apiUrl = 'https://ranklol-server.herokuapp.com/api'
}

function fetchMatch (matchId) {
  return axios.get(`${apiUrl}/match/${matchId}`)
}
function fetchSummoner (summonerName, region) {
  return axios.get(`${apiUrl}/summoner/${summonerName}?region=${region}`)
}
function fetchChampions () {
  return axios.get(`${apiUrl}/champions`) // eslint-disable-line
}

import axios from 'axios'
import listService from '../services/listService'
import RoleCard from './RoleCard'
import DayCard from './DayCard'
import DayOfWeekCard from './DayOfWeekCard'
import ChampionCard from './ChampionCard'
import WinDetails from './WinDetails'
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
    ChampionCard,
    DayOfWeekCard,
    WinDetails
  },
  methods: {
    setMyMatchDetail (detail) {
      this.winDetails = this.winDetails.concat(detail)
    },
    setMatchDetail (fullDetail) {
      this.wholeWinDetails.push(fullDetail)
    },
    loadSummonerData (name, region = 'EUW') {
      this.summonerName = name
      if (this.loading) {
        return
      }
      this.loading = true
      this.winDetails = []
      this.wholeWinDetails = []
      fetchSummoner(name, region)
        .then(results => {
          this.results = results.data
          this.totalGamesNumber = results.data.matchIds && results.data.matchIds.length
          this.loading = false
        })
        .then(() => {
          const setMyMatchDetail = this.setMyMatchDetail
          const setMatchDetail = this.setMatchDetail
          const matchIds = this.results.matchIds
          var interval = setInterval(function () {
            const matchId = matchIds.shift()
            fetchMatch(matchId)
              .then(matchSummary => {
                const onlyMe = matchSummary.data.filter(matchData => matchData.summonerName === name)
                setMyMatchDetail(onlyMe)
                setMatchDetail(matchSummary.data)
                if (!matchIds.length) clearInterval(interval)
              })
          }, 150)
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
      loading: false,
      winDetails: [],
      wholeWinDetails: [],
      totalGamesNumber: 0
    }
  },
  computed: {
    mostPlayedRole: function () {
      return listService.mostPlayed(this.results.rolesData)
    },
    numberOfMostPlayedRole: function () {
      return this.results.rolesData && this.results.rolesData[this.mostPlayedRole]
    },
    mostPlayedDay: function () {
      return listService.mostPlayed(this.results.daysData)
    },
    numberOfMostPlayedDay: function () {
      return this.results.daysData && this.results.daysData[this.mostPlayedDay]
    },
    mostPlayedDayOfWeek: function () {
      return listService.mostPlayed(this.results.daysOfWeekData)
    },
    numberOfMostPlayedDayOfWeek: function () {
      return this.results.daysOfWeekData && this.results.daysOfWeekData[this.mostPlayedDayOfWeek]
    },
    championsOrdered: function () {
      return listService.orderChampions(this.results.championData)
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
    max-width: 45rem;
    margin: 1rem auto;
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

  .load-button {
    max-width: 10rem;
    margin: 0.5rem auto;
  }
  .player-picture {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    margin: 0 auto;
    background-position: center;
    background-size: cover;
  }
  .picture--faker {
    background-image: url('~assets/Faker.jpg');
  }
  .picture--hans {
    background-image: url('~assets/Hans-sama.jpg');
  }
  .picture--rekkles {
    background-image: url('~assets/Rekkles.jpg');
  }
  .player-description {
    margin: 0.5rem 0;
  }
</style>
