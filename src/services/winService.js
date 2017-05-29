function findRole (winDetail) {
  switch (`${winDetail.role}_${winDetail.lane}`) {
    case 'SOLO_MIDDLE':
      return 'Mid Lane'
    case 'NONE_MIDDLE':
      return 'Mid Lane'
    case 'DUO_CARRY_MIDDLE':
      return 'Mid Lane'
    case 'DUO_SUPPORT_MIDDLE':
      return 'Mid Lane'
    case 'SOLO_TOP':
      return 'Top Lane'
    case 'NONE_JUNGLE':
      return 'Jungler'
    case 'DUO_CARRY_BOTTOM':
      return 'AD Carry'
    case 'DUO_SUPPORT_BOTTOM':
      return 'Support'
    case 'DUO_BOTTOM':
      return 'AD Carry'
    case 'SOLO_BOTTOM':
      return 'AD Carry'
    case 'NONE_BOTTOM':
      return 'AD Carry'
    default:
      console.log(`${winDetail.role}_${winDetail.lane}`)
      return 'Unknown role'
  }
}

function hasPlayedAgainst (gameDetail, summonerName, championId) {
  const myDetail = gameDetail.find(playerWinDetail => playerWinDetail.summonerName === summonerName)
  const ennemiesDetail = gameDetail.filter(playerWinDetail => playerWinDetail.winner !== myDetail.winner)
  return ennemiesDetail.some(ennemyDetail => ennemyDetail.championId === championId)
}

export default {
  groupByChampions (winDetails) {
    const groupedByChamp = winDetails
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
      .sort((a, b) => b.number - a.number)
    return groupedByChamp
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
      .sort((a, b) => b.number - a.number)
  },
  findMatchesAgainst (wholeWinDetails, summonerName, champions) {
    const championsAsCounters =
      champions.reduce((acc, champion) => {
        const championId = champion.id
        const hasPlayedAgainstChamp = wholeWinDetails.some(wholeWinDetail => hasPlayedAgainst(wholeWinDetail, summonerName, championId))
        if (!hasPlayedAgainstChamp) {
          return acc
        }
        if (!acc || !acc[championId]) {
          acc[championId] = {
            win: 0,
            loose: 0,
            number: 0,
            myChampAgainst: {
              win: [],
              loose: []
            },
            name: champion.name,
            image: champion.image
          }
        }
        wholeWinDetails.forEach(wholeWinDetail => {
          const myWinDetail = wholeWinDetail.find(playerWinDetail => playerWinDetail.summonerName === summonerName)
          const ennemiesDetail = wholeWinDetail.filter(playerWinDetail => playerWinDetail.winner !== myWinDetail.winner)
          const ennemiesHaveChamp = ennemiesDetail.some(ennemyDetail => ennemyDetail.championId === championId)
          if (!ennemiesHaveChamp) {
          } else if (myWinDetail.winner) {
            acc[championId].win += 1
            acc[championId].number += 1
            acc[championId].myChampAgainst.win.push(myWinDetail.championId)
          } else {
            acc[championId].loose += 1
            acc[championId].number += 1
            acc[championId].myChampAgainst.loose.push(myWinDetail.championId)
          }
        })
        return acc
      }, {})
    return championsAsCounters
  }
}
