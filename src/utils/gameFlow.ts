import { invoke } from "@tauri-apps/api";
import { GameData } from "../interface/GameFlow";
import { querySummonerInfo } from "./curSummoner";
import { formatMathchInfo } from "../utils/getMatchInfo";
import { lcuSummonerInfo } from "../interface/SummonerInfo";

export const getAllSummonersId = async () => {
	const chatInfo: any = await invoke("get_chat_info");
	let summonerIdList: number[] = [];
	if (chatInfo && chatInfo.length > 0) {
		let chat_id = "";
		chatInfo.map((item: any) => {
			if (item.type === "championSelect") {
				chat_id = item.id;
			}
		});
		const allSummoners: any =
			(await invoke("query_all_summoners", {
				chatId: chat_id,
			})) || [];
		if (Array.isArray(allSummoners) && allSummoners.length > 0) {
			allSummoners.map((el) => {
				summonerIdList.push(el.fromSummonerId);
			});
		}

		return [...new Set(summonerIdList)];
	} else {
		return [];
	}
};

export const sendMsg = async (message: string) => {
	const params = {
		body: message,
		type: "chat",
	};
	const chatList: any = await invoke("get_chat_info");
	if (chatList && chatList.length > 0) {
		let chat_id = "";
		chatList.map((item: any) => {
			if (item.type === "championSelect") {
				chat_id = item.id;
			}
		});
		await invoke("send_msg_to", {
			chatId: chat_id,
			params: JSON.stringify(params),
		});
	}
};
export const getAllSummonersInfo = async (queueId?: number) => {
	const summonerIdList = await getAllSummonersId();

	const allSummonerInfo: any = {};
	const summonerList: any = [];
	summonerIdList.map((item) => {
		summonerList.push({
			summonerId: item,
		});
	});
	allSummonerInfo.teamate = await id2Info(summonerList, queueId);
	return allSummonerInfo;
};

const id2Info = async (summonerIdList: any[], queueId?: number) => {
	const allSummonerInfo = [];
	for (const summoners of summonerIdList) {
		const summoner = await querySummonerInfo(summoners.summonerId);
		let matchList = await formatMathchInfo(
			summoner.summonerInfo.puuid,
			"0",
			"30"
		);
		if (queueId) {
			matchList = matchList
				.filter((item) => item.queueId === queueId)
				.slice(0, 5);
		}
		allSummonerInfo.push({
			...summoner,
			matchList,
			champId: summoners.championId,
		});
	}
	return allSummonerInfo;
};
// 查询本地召唤师信息
const queryLoaclSummoner = async () => {
	const summonerInfo: lcuSummonerInfo = await invoke("get_cur_sum");
	return summonerInfo.summonerId;
};

export const getGame = async () => {
	const currentId = await queryLoaclSummoner();
	const mactchSession: GameData = await invoke("get_game_session");
	const queueId = mactchSession?.gameData?.queue?.id;
	if (
		mactchSession?.gameClient?.running &&
		mactchSession.httpStatus !== 404
	) {
		// 游戏中 查询所有队友
		if (
			mactchSession.gameData.teamOne.find(
				(i: any) => i.summonerId === currentId
			)
		) {
			var [enemyInfo, friendInfo] = [
				mactchSession.gameData.teamTwo,
				mactchSession.gameData.teamOne,
			];
		} else {
			var [friendInfo, enemyInfo] = [
				mactchSession.gameData.teamTwo,
				mactchSession.gameData.teamOne,
			];
		}
		let enemyInfoIds: any[] = [];
		enemyInfo.map((item) => {
			enemyInfoIds.push({
				summonerId: item.summonerId,
				championId: item.championId,
			});
		});
		let friendInfoIds: any[] = [];
		friendInfo.map((item) => {
			friendInfoIds.push({
				summonerId: item.summonerId,
				championId: item.championId,
			});
		});
		const allSummonerInfo: any = {};
		allSummonerInfo.teamate = await id2Info(friendInfoIds, queueId);
		allSummonerInfo.enemy = await id2Info(enemyInfoIds, queueId);
		return allSummonerInfo;
	} else {
		// 游戏外 查询游戏前会话时 （队友）
		const allm = await getAllSummonersInfo(queueId);
		return allm;
	}
};
