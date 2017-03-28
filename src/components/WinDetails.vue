<template>
  <div class="table-card">
    <md-card>
      <table class="table">
        <thead class="table_header">
          <tr class="table_row">
            <th class="table_champ">Wins by champion</th>
            <th class="table_number">
             Games
           </th>
            <th class="table_number">
              Win
            </th>
            <th class="table_number">
              Loose
            </th>
            <th class="table_number">
              Percentage
            </th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
           class="table_row"
           v-for="winStat in winDetailsByChampions">
            <td class="table_champ">
              <md-avatar class="md-large avatar-table">
                <img :src="championImageUrls.find(championName => championName.championId === winStat.championId).url">
              </md-avatar>
              <div class="avatar-name">
                {{championNames.find(championName => championName.championId === winStat.championId).name}}
              </div>
            </td>
            <td class="table_number">
              {{ winStat.number }}
            </td>
            <td class="table_number">
              {{ winStat.win }}
            </td>
            <td class="table_number">
              {{ winStat.loose }}
            </td>
            <td class="table_number">
              {{ Math.round((winStat.win / winStat.number) * 100) }}%
            </td>
          </tr>
        </tbody>
      </table>
    </md-card>

    <md-card class="roles">
      <md-card>
        <table class="table">
          <thead class="table_header">
            <tr class="table_row">
              <th class="table_champ">Wins by Role</th>
              <th class="table_number">
               Games
             </th>
              <th class="table_number">
                Win
              </th>
              <th class="table_number">
                Loose
              </th>
              <th class="table_number">
                Percentage
              </th>
            </tr>
          </thead>
          <tbody class="table-body">
            <tr
             class="table_row"
             v-for="winStat in winDetailsByRoles">
              <td class="table_champ">
                {{winStat.role}}
              </td>
              <td class="table_number">
                {{ winStat.number }}
              </td>
              <td class="table_number">
                {{ winStat.win }}
              </td>
              <td class="table_number">
                {{ winStat.loose }}
              </td>
              <td class="table_number">
                {{ Math.round((winStat.win / winStat.number) * 100) }}%
              </td>
            </tr>
          </tbody>
        </table>
    </md-card>
  </div>
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
    winDetailsByRoles: function () {
      return winService.groupByRoles(this.winDetails)
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
.table {
  display: flex;
  flex-direction: column;
}
.table_header {
  display: flex;
  background: #b71c1c;
  color: rgba(255, 255, 255, .87);
  padding: 14px 0;
}
.table_row {
  display: flex;
  flex: 1;
  border-bottom: 1px solid #e0e0e0;
}
.table_row:last-of-type {
  border-bottom: none;
}
.table_number {
  display: flex;
  flex: 0 0 6rem;
  align-items: center;
  justify-content: center;
}
.table_champ {
  display: flex;
  padding: 0.5rem;
  flex: 1;
  align-items: center;
  justify-content: center;
}
.table-body {
  text-align: right;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.table-card {
  margin: 1rem;
}
.roles {
  margin-top: 1rem;
}
.avatar-table {
  margin: 0;
  margin-right: 1rem;
}
.avatar-name {
  flex: 0 0 6rem;
  margin: 0;
  margin-right: 1rem;
}
</style>
