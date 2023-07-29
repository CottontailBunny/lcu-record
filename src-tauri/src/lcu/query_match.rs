use serde::{Serialize, Deserialize};
use chrono::{TimeZone, Utc};
#[derive(Serialize, Deserialize)] #[allow(non_snake_case)]  #[derive(Clone)] #[derive(Debug)]
struct Games {
    games:Vec<GamesDetails>,
}

#[derive(Serialize, Deserialize)] #[allow(non_snake_case)]  #[derive(Clone)] #[derive(Debug)]

struct GamesDetails {
    gameCreation: i64,
    gameCreationDate: String,
    gameDuration: i64,
    gameId: i64,
    gameMode: String,
    gameType: String,
    gameVersion: String,
    mapId: i64,
    participantIdentities: Vec<ParticipantIdentities>,
    participants: Vec<Participants>,
    platformId: String,
    queueId: i64,
    seasonId: i64,
}

#[derive(Serialize, Deserialize)] #[allow(non_snake_case)] #[derive(Clone)] #[derive(Debug)]
struct ParticipantIdentities {
    participantId: i64,
    player: Player,
}

#[derive(Serialize, Deserialize)] #[allow(non_snake_case)] #[derive(Clone)] #[derive(Debug)]
struct Participants {
    championId: i64,
    highestAchievedSeasonTier: String,
    participantId: i64,
    spell1Id: i64,
    spell2Id: i64,
    stats: Stats,
    teamId: i64,
}

#[derive(Serialize, Deserialize)] #[allow(non_snake_case)] #[derive(Clone)] #[derive(Debug)]
struct Player {
    accountId: i64,
    currentAccountId: i64,
    currentPlatformId: String,
    matchHistoryUri: String,
    platformId: String,
    profileIcon: i64,
    puuid: String,
    summonerId: i64,
    summonerName: String,
}

#[derive(Serialize, Deserialize)] #[allow(non_snake_case)] #[derive(Debug)]
pub struct MatchStruct {
    games: Games,
}

#[derive(Serialize, Deserialize)] #[allow(non_snake_case)] #[derive(Clone)] #[derive(Debug)]
struct Stats {
    assists: i64,
    causedEarlySurrender: bool,
    champLevel: i64,
    combatPlayerScore: i64,
    damageDealtToObjectives: i64,
    damageDealtToTurrets: i64,
    damageSelfMitigated: i64,
    deaths: i64,
    doubleKills: i64,
    earlySurrenderAccomplice: bool,
    firstBloodAssist: bool,
    firstBloodKill: bool,
    firstInhibitorAssist: bool,
    firstInhibitorKill: bool,
    firstTowerAssist: bool,
    firstTowerKill: bool,
    gameEndedInEarlySurrender: bool,
    gameEndedInSurrender: bool,
    goldEarned: i64,
    goldSpent: i64,
    inhibitorKills: i64,
    item0: i64,
    item1: i64,
    item2: i64,
    item3: i64,
    item4: i64,
    item5: i64,
    item6: i64,
    killingSprees: i64,
    kills: i64,
    largestCriticalStrike: i64,
    largestKillingSpree: i64,
    largestMultiKill: i64,
    longestTimeSpentLiving: i64,
    magicDamageDealt: i64,
    magicDamageDealtToChampions: i64,
    magicalDamageTaken: i64,
    neutralMinionsKilled: i64,
    neutralMinionsKilledEnemyJungle: i64,
    neutralMinionsKilledTeamJungle: i64,
    objectivePlayerScore: i64,
    participantId: i64,
    pentaKills: i64,
    perk0: i64,
    perk0Var1: i64,
    perk0Var2: i64,
    perk0Var3: i64,
    perk1: i64,
    perk1Var1: i64,
    perk1Var2: i64,
    perk1Var3: i64,
    perk2: i64,
    perk2Var1: i64,
    perk2Var2: i64,
    perk2Var3: i64,
    perk3: i64,
    perk3Var1: i64,
    perk3Var2: i64,
    perk3Var3: i64,
    perk4: i64,
    perk4Var1: i64,
    perk4Var2: i64,
    perk4Var3: i64,
    perk5: i64,
    perk5Var1: i64,
    perk5Var2: i64,
    perk5Var3: i64,
    perkPrimaryStyle: i64,
    perkSubStyle: i64,
    physicalDamageDealt: i64,
    physicalDamageDealtToChampions: i64,
    physicalDamageTaken: i64,
    playerScore0: i64,
    playerScore1: i64,
    playerScore2: i64,
    playerScore3: i64,
    playerScore4: i64,
    playerScore5: i64,
    playerScore6: i64,
    playerScore7: i64,
    playerScore8: i64,
    playerScore9: i64,
    quadraKills: i64,
    sightWardsBoughtInGame: i64,
    teamEarlySurrendered: bool,
    timeCCingOthers: i64,
    totalDamageDealt: i64,
    totalDamageDealtToChampions: i64,
    totalDamageTaken: i64,
    totalHeal: i64,
    totalMinionsKilled: i64,
    totalPlayerScore: i64,
    totalScoreRank: i64,
    totalTimeCrowdControlDealt: i64,
    totalUnitsHealed: i64,
    tripleKills: i64,
    trueDamageDealt: i64,
    trueDamageDealtToChampions: i64,
    trueDamageTaken: i64,
    turretKills: i64,
    unrealKills: i64,
    visionScore: i64,
    visionWardsBoughtInGame: i64,
    wardsKilled: i64,
    wardsPlaced: i64,
    win: bool,
}

#[derive(Serialize, Deserialize)] #[allow(non_snake_case)] #[derive(Debug)]
pub struct MatchList {
    gameId: String,
    champId: i64,
    isWin: bool,
    kills: i64,
    deaths: i64,
    assists: i64,
    matchTime: String,
    gameModel: String,
}

impl MatchStruct {

    pub fn get_simple_match(&mut self,queue_id:i64) -> Vec<MatchList> {
        let mut match_vec:Vec<MatchList> = Vec::new();
        let len = self.games.games.len();
        if len == 0 { return match_vec }

        for game in self.is_rev(self.games.games.clone(),len) {
            if game.queueId == queue_id {
                let match_list = MatchList {
                    gameId:game.gameId.to_string(),
                    champId:game.participants[0].championId,
                    isWin:game.participants[0].stats.win,
                    // 击杀数目
                    kills: game.participants[0].stats.kills,
                    // 死亡数目
                    deaths: game.participants[0].stats.deaths,
                    // 助攻数目
                    assists: game.participants[0].stats.assists,
                    // 游戏时间
                    matchTime: format_timestamp(game.gameCreation),
                    // 游戏模式
                    gameModel:query_game_type(queue_id)
                };
                match_vec.push(match_list);
            }
        }
        match_vec
    }

    fn is_rev(&mut self, game_vec: Vec<GamesDetails>, len: usize) -> Vec<GamesDetails> {
        if game_vec[0].gameCreation > game_vec[len - 1].gameCreation {
            game_vec
        } else {
            let mut reverse_vec = game_vec.clone();
            reverse_vec.reverse();
            reverse_vec
        }
    }
}


fn query_game_type(queue_id:i64) -> String{
    match queue_id {
        420 => "单双排位".to_string(),
        430 => "匹配模式".to_string(),
        440 => "灵活排位".to_string(),
        450 => "极地乱斗".to_string(),
        _ => "其它模式".to_string()
    }
}

fn format_timestamp(timestamp:i64) ->String{
    let dt = Utc.timestamp_millis_opt(timestamp);
    dt.unwrap().format("%m-%d").to_string()
}
