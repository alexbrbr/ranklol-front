<template>
  <md-tabs md-fixed>
    <md-tab id="champions" md-label="Champions">
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
               v-for="winStat in winDetailsByChampions"
               v-bind:key="winStat.championId">
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
    </md-tab>

    <md-tab id="roles" md-label="Roles">
      <div class="table-card">
        <md-card class="roles">
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
                 v-if="winStat.role !== 'Unknown role'"
                 v-for="winStat in winDetailsByRoles">
                  <td class="table_champ">
                    <md-avatar class="md-large">
                      <img :src="'/static/roleIcons/' + winStat.role + '.png'">
                    </md-avatar>
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
    </md-tab>

    <md-tab id="counters" md-label="Counters">
      <md-button class="md-raised md-primary"
       v-on:click="getWinDetailAgainst()">
       Load games against all champions
      </md-button>
      <div class="table-card">
        <md-card class="roles">
          <md-card>
            <table class="table">
              <thead class="table_header">
                <tr class="table_row">
                  <th class="table_champ-against">Wins Against</th>
                  <th class="table_number">
                   Games
                 </th>
                  <th class="table_avatars">
                    Win
                  </th>
                  <th class="table_avatars">
                    Loose
                  </th>
                  <th class="table_number">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody class="table-body">
                <tr
                 v-for="winStatAgainst in winDetailAgainst"
                 class="table_row">
                  <td class="table_champ-against">
                    <md-avatar class="md-large avatar-table-against">
                      <img :src="winStatAgainst.image">
                    </md-avatar>
                    <div>
                      against <strong>{{winStatAgainst.name}}</strong>
                    </div>
                  </td>
                  <td class="table_number">
                    {{ winStatAgainst.number }}
                  </td>
                  <td class="table_avatars">
                    <div v-if="winStatAgainst.win === 0">
                    </div>
                    <div v-else-if="winStatAgainst.win === 1">
                      {{winStatAgainst.win}} game won
                    </div>
                    <div v-else-if="winStatAgainst.win > 1">
                      {{winStatAgainst.win}} games won
                    </div>
                    <div class="avatar-counter-list">
                      <div v-for="winChampId in winStatAgainst.myChampAgainst.win">
                        <md-avatar class="md-large avatar-counter">
                          <img :src="champions.find(champ => champ.id === parseInt(winChampId, 10)).image">
                        </md-avatar>
                      </div>
                    </div>
                  </td>
                  <td class="table_avatars">
                    <div v-if="winStatAgainst.loose === 0">
                    </div>
                    <div v-else-if="winStatAgainst.loose === 1">
                      {{winStatAgainst.loose}} game lost
                    </div>
                    <div v-else-if="winStatAgainst.loose > 1">
                      {{winStatAgainst.loose}} games lost
                    </div>
                    <div class="avatar-counter-list">
                      <div v-for="looseChampId in winStatAgainst.myChampAgainst.loose">
                        <md-avatar class="md-large avatar-counter">
                          <img :src="champions.find(champ => champ.id === parseInt(looseChampId, 10)).image">
                        </md-avatar>
                      </div>
                    </div>
                  </td>

                  <td class="table_number">
                    {{ Math.round((winStatAgainst.win / winStatAgainst.number) * 100) }}%
                  </td>
                </tr>
              </tbody>
            </table>
        </md-card>
      </div>
    </md-tab>

  </md-tabs>


  <!-- </div> -->
</template>

<script>
import winService from '../services/winService'

export default {
  props: [
    'champions',
    'winDetails',
    'wholeWinDetails',
    'summonerName'
  ],
  data () {
    return {
      ennemyChamp: {
        name: '',
        id: '',
        image: ''
      },
      enemyChampName: 0,
      winDetailAgainst: {}
    }
  },
  methods: {
    getWinDetailAgainst: function () {
      this.winDetailAgainst = winService.findMatchesAgainst(this.wholeWinDetails, this.summonerName, this.champions)
    }
  },
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
.table_avatars {
  display: flex;
  flex-direction: column;
  flex: 0 0 12rem;
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
.table_champ-against {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  flex: 10rem;
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
  max-width: 45rem;
  margin: 1rem auto;
}
.roles {
  margin-top: 1rem;
}
.avatar-table {
  margin: 0;
  margin-right: 1rem;
}
.avatar-table-against {
  margin: 0.5rem 0;
}
.avatar-counter {
  height: 3rem;
  width: 3rem;
  min-height: 3rem;
  min-width: 3rem;
  margin: 0.5rem 1rem;
}
.avatar-name {
  flex: 0 0 6rem;
  margin: 0;
  margin-right: 1rem;
}
.avatar-counter-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
