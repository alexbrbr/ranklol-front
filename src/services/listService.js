export default {
  mostPlayed (playedByCategory) {
    return playedByCategory && Object
      .keys(playedByCategory)
      .reduce((mostPlayed, curr) => {
        return playedByCategory[curr] > playedByCategory[mostPlayed]
          ? curr
          : mostPlayed
      })
  },
  orderChampions (champions) {
    return Object
      .keys(champions)
      .map(id => ({
        id,
        numberOfTimesPlayed: champions[id]
      }))
      .sort((championA, championB) => {
        return championB.numberOfTimesPlayed - championA.numberOfTimesPlayed
      })
  }
}
