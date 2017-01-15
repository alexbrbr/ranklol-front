<template>
  <div class="cards-list">
    <champion-card
     v-for="(champion, index) in championsOrdered"
     v-bind:champion-id="champion.id"
     v-bind:games-number-for-champion="champion.numberOfTimesPlayed"
     v-bind:champions="champions"
     v-bind:index="index"
     v-bind:total-games-number="matchIds && matchIds.length">
   </champion-card>
 </div>
</template>

<script>
import ChampionCard from './ChampionCard'

export default {
  name: 'myComponent',
  props: [
    'matchIds',
    'championList',
    'champions'
  ],
  components: {
    ChampionCard
  },
  data () {
    return {
    }
  },
  computed: {
    championsOrdered: function () {
      return Object
        .keys(this.championList)
        .map(id => ({
          id,
          numberOfTimesPlayed: this.championList[id]
        }))
        .sort((championA, championB) => {
          return championB.numberOfTimesPlayed - championA.numberOfTimesPlayed
        })
    },
    mostPlayedChampion: function () {
      return this.championList && Object
        .keys(this.championList)
        .reduce((mostPlayed, curr) => {
          return this.championList[curr] > this.championList[mostPlayed]
          ? curr
          : mostPlayed
        })
    },
    numberOfMostPlayedChampion: function () {
      return this.championList && this.championList[this.mostPlayedChampion]
    }
  }
}
</script>

<style scoped>
  .champion-card {
    flex: 0 0 20rem;
    margin: 1rem 0;
  }
  .champion-card__header {
    background-color: #b71c1c;
    color: rgba(255, 255, 255, .87);
  }
</style>
