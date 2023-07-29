import { invoke } from "@tauri-apps/api";
import { lcuSummonerInfo, ExcelChamp } from "../interface/SummonerInfo";
import { trans2Chinese, dealDivsion } from "../utils/methods";
import { champDict } from "../assets/champList";

export const querySummonerInfo = async (sumId?: number) => {
	const summonerInfo: lcuSummonerInfo = sumId
		? await invoke("get_other_sum", { summonerId: String(sumId) })
		: await invoke("get_cur_sum");
	const { profileIconId, puuid, summonerId } = summonerInfo;
	summonerInfo.avaUrl = `https://wegame.gtimg.com/g.26-r.c2d3c/helper/lol/assis/images/resources/usericon/${profileIconId}.png`;
	const [rankPoint, excelChamp] = await Promise.all([
		getRankPoint(puuid),
		getExcelChamp(`${summonerId}`),
	]);

	return {
		summonerInfo,
		rankPoint,
		excelChamp,
	};
};

// 查询召唤师排位分数
const getRankPoint = async (puuid: string) => {
	const rankPoint: any = await invoke("get_cur_rank_point", { puuid: puuid });
	// 单双排位/ 灵活排位/ 云顶之亦
	let rankSolo = rankPoint.queues.find(
		(i: any) => i.queueType === "RANKED_SOLO_5x5"
	);
	let rankSr = rankPoint.queues.find(
		(i: any) => i.queueType === "RANKED_FLEX_SR"
	);
	let rankTft = rankPoint.queues.find(
		(i: any) => i.queueType === "RANKED_TFT"
	);

	let RANKED_SOLO =
		rankSolo.tier === ""
			? "未定级"
			: `${trans2Chinese(rankSolo.tier)}${dealDivsion(
					rankSolo.division
			  )} ${rankSolo.leaguePoints}`;
	let RANKED_FLEX_SR =
		rankSr.tier === ""
			? "未定级"
			: `${trans2Chinese(rankSr.tier)}${dealDivsion(rankSr.division)} ${
					rankSr.leaguePoints
			  }`;
	let RANKED_TFT =
		rankTft.tier === ""
			? "未定级"
			: `${trans2Chinese(rankTft.tier)}${dealDivsion(rankTft.division)} ${
					rankTft.leaguePoints
			  }`;
	return [RANKED_SOLO, RANKED_FLEX_SR, RANKED_TFT];
};

// 获取常用英雄
const getExcelChamp = async (summonerId: string): Promise<ExcelChamp[]> => {
	const summonerSuperChampData: any = await invoke("get_excel_champ", {
		summonerId: summonerId,
	});
	return summonerSuperChampData.slice(0, 20).reduce((res: any, item: any) => {
		return res.concat({
			champImgUrl: `https://game.gtimg.cn/images/lol/act/img/champion/${
				champDict[item.championId].alias
			}.png`,
			champLevel: item.championLevel,
			championPoints: item.championPoints,
			champLabel: `${champDict[item.championId].label} ${
				champDict[item.championId].title
			}`,
		});
	}, []);
};
