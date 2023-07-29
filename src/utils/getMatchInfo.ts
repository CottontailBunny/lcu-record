import { invoke } from '@tauri-apps/api';
import { LcuMatchList, MatchList, Game } from "../interface/MatchInfo";
import { timestampToDate, queryGameType } from './methods'
import {champDict} from '../assets/champList'


// 根据召唤师ID查询战绩
const getMatchList = async ( puuid: string, begIndex: string, endIndex: string ): Promise<LcuMatchList | null> => {
  try {
    const res: LcuMatchList = await invoke('get_match_list', { puuid: puuid, begIndex: begIndex, endIndex: endIndex })
    console.log('RES', res);

    return res
  } catch (e) {
    return null
  }
}

// 获取基本的对局数据
const getSimpleMatch = (match: Game, gameModel: string): MatchList => {
  return {
    gameId: String(match.gameId),
    champId: String(match.participants[0].championId),
    // 是否取得胜利
    isWin: match.participants[0].stats.win === true ? true : false,
    // 击杀数目
    kills: match.participants[0].stats.kills,
    // 死亡数目
    deaths: match.participants[0].stats.deaths,
    // 助攻数目
    assists: match.participants[0].stats.assists,
    // 游戏时间
    matchTime: timestampToDate(match.gameCreation),
    // 游戏模式
    kda:`${match.participants[0].stats.kills}/${match.participants[0].stats.deaths}/${match.participants[0].stats.assists}`,
    gameModel: gameModel,
    role:champDict[match.participants[0].championId].label
  }
}

export const formatMathchInfo = async (puuid: string, begIndex: string, endIndex: string) => {
  const simpleMatchList: MatchList[] = []
  const matchList = await getMatchList(puuid, begIndex, endIndex);
  if (matchList === null || matchList?.games?.games?.length === 0 || matchList?.games?.games === undefined) {
    return [];
  }
  matchList.games?.games?.map(item => {
    const gameModel = queryGameType(item.queueId);
    simpleMatchList.push(getSimpleMatch(item, gameModel))
  })
  return simpleMatchList;

}