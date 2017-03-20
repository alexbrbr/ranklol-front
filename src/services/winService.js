export default {
  groupByChampions (winDetails) {
    return winDetails
      .reduce((acc, winDetail) => {
        const index = acc
          .findIndex(accWin => accWin.championId === winDetail.championId)
        if (index >= 0) {
          acc[index].number += 1
          winDetail.winner
            ? acc[index].win += 1
            : acc[index].loose += 1
        } else {
          acc.push({
            championId: winDetail.championId,
            number: 1,
            win: winDetail.winner ? 1 : 0,
            loose: winDetail.winner ? 0 : 1
          })
        }
        return acc
      }, [])
  }
}
