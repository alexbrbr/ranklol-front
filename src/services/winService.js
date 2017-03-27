function findRole (winDetail) {
  switch (`${winDetail.role}_${winDetail.lane}`) {
    case 'SOLO_MIDDLE':
      return 'Solo Mid'
    case 'SOLO_TOP':
      return 'Solo Top'
    case 'NONE_JUNGLE':
      return 'Jungler'
    case 'DUO_CARRY_BOTTOM':
      return 'AD Carry'
    case 'DUO_SUPPORT_BOTTOM':
      return 'Support'
    default:
      console.log(`${winDetail.role}_${winDetail.lane}`)
      return 'Unknown role'
  }
}

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
  },
  groupByRoles (winDetails) {
    return winDetails
      .reduce((acc, winDetail) => {
        const matchRole = findRole(winDetail)
        const index = acc
          .findIndex(accWin => accWin.role === matchRole)
        if (index >= 0) {
          acc[index].number += 1
          winDetail.winner
            ? acc[index].win += 1
            : acc[index].loose += 1
        } else {
          acc.push({
            role: matchRole,
            number: 1,
            win: winDetail.winner ? 1 : 0,
            loose: winDetail.winner ? 0 : 1
          })
        }
        return acc
      }, [])
  }
}
