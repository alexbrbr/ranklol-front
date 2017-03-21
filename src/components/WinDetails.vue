<template>
  <md-card class="table-card">
    <md-table>
      <md-table-header>
        <md-table-row>
          <md-table-head>Wins by champion</md-table-head>
          <md-table-head md-numeric>Games</md-table-head>
          <md-table-head md-numeric>Win</md-table-head>
          <md-table-head md-numeric>Loose</md-table-head>
          <md-table-head md-numeric>Percentage</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body class="table-body">
        <md-table-row v-for="winStat in winDetailsByChampions">
          <md-table-cell>
            <md-avatar class="md-large">
              <img :src="championImageUrls.find(championName => championName.championId === winStat.championId).url">
            </md-avatar>
            {{championNames.find(championName => championName.championId === winStat.championId).name}}
          </md-table-cell>
          <md-table-cell>{{ winStat.number }}</md-table-cell>
          <md-table-cell>{{ winStat.win }}</md-table-cell>
          <md-table-cell>{{ winStat.loose }}</md-table-cell>
          <md-table-cell>{{ Math.round((winStat.win / winStat.number) * 100) }}%</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-card>
</template>

<script>
import winService from '../services/winService'

export default {
  props: [
    'champions',
    'winDetails'
  ],
  computed: {
    winDetailsByChampions: function () {
      return winService.groupByChampions(this.winDetails)
    },
    championImageUrls: function () {
      const championList = this.champions
      return this.winDetailsByChampions
        .map(winDetail => ({
          url: championList.find(champInList => winDetail.championId === champInList.id).image,
          championId: winDetail.championId
        }))
    },
    championNames: function () {
      const championList = this.champions
      return this.winDetailsByChampions
        .map(winDetail => ({
          name: championList.find(champInList => winDetail.championId === champInList.id).name,
          championId: winDetail.championId
        }))
    }
  }
}
</script>

<style scoped>
.table-card {
  margin: 1rem;
}
.table-body {
  text-align: right;
}
</style>
