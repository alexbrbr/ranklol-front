<template>
  <md-card class="champion-card">
    <md-whiteframe class="champion-card__header">
      <md-card-header>
        <div class="md-title">{{championName}}</div>
      </md-card-header>
    </md-whiteframe>

    <md-card-content>
      <md-avatar class="md-large">
        <img :src="championImageUrl">
      </md-avatar>
      <div class="md-subhead">
        Most played champion during season
      </div>
      {{gamesNumberForChampion}} out of {{totalGamesNumber}} matches
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'myComponent',
  props: [
    'championName',
    'gamesNumberForChampion',
    'totalGamesNumber',
    'champions'
  ],
  created () {
  },
  methods: {
  },
  data () {
    return {
    }
  },
  computed: {
    championImageUrl: function () {
      return this.champions
        .find(champion => champion.name === this.championName)
        .image
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
