<template>
  <md-card class="champion-card">
    <md-whiteframe class="champion-card__header">
      <md-card-header>
        <div class="md-title">{{championName}}</div>
      </md-card-header>
    </md-whiteframe>

    <md-card-content>
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
    'totalGamesNumber'
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
