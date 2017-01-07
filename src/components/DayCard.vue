<template>
  <md-card class="day-card">
    <md-whiteframe class="day-card__header">
      <md-card-header>
        <div class="md-title">{{dayName}}</div>
      </md-card-header>
    </md-whiteframe>

    <md-card-content>
      <md-avatar class="md-large">
        <md-icon class="md-primary">date_range</md-icon>
      </md-avatar>
      <div class="md-subhead">
        Most played day during season
      </div>
      {{gamesNumberInDay}} out of {{totalGamesNumber}} matches
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  name: 'myComponent',
  props: [
    'dayName',
    'gamesNumberInDay',
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
  .day-card {
    flex: 0 0 20rem;
    margin: 1rem 0;
  }
  .day-card__header {
    background-color: #b71c1c;
    color: rgba(255, 255, 255, .87);
  }
</style>
