<template>
  <md-card class="role-card">
    <md-whiteframe class="role-card__header">
      <md-card-header>
        <div class="md-title">{{roleName}}</div>
      </md-card-header>
    </md-whiteframe>

    <md-card-content>
      <md-avatar class="md-large">
        <img :src="roleIcon">
      </md-avatar>
      <div class="md-subhead">
        Most played role during season
      </div>
      {{gamesNumberInRole}} out of {{totalGamesNumber}} matches
    </md-card-content>
  </md-card>
</template>

<script>
export default {
  props: [
    'roleName',
    'gamesNumberInRole',
    'totalGamesNumber'
  ],
  computed: {
    roleIcon () {
      return '/static/roleIcons/' + this.roleName + '.png'
    }
  }
}
</script>

<style scoped>
  .role-card {
    flex: 0 0 20rem;
    margin: 1rem 0;
  }
  .role-card__header {
    background-color: #b71c1c;
    color: rgba(255, 255, 255, .87);
  }
</style>
