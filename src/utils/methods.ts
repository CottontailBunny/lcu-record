import { champDict } from "../assets/champList";

// 根据游戏模式ID判断 游戏模式
export const queryGameType = (queueId: number) => {
	switch (queueId) {
		case 420:
			return "单双排位";
		case 430:
			return "匹配模式";
		case 440:
			return "灵活排位";
		case 450:
			return "极地乱斗";
		case 1700:
			return "斗魂竞技场";
	}
	return "其它模式";
};

export const timestampToDate = (timestamp: number) => {
	var date = new Date(timestamp);
	return (
		(date.getMonth() + 1 < 10
			? "0" + (date.getMonth() + 1)
			: date.getMonth() + 1) +
		"-" +
		date.getDate()
	);
};

export const getImgUrl = (champId: string) => {
	return `https://game.gtimg.cn/images/lol/act/img/champion/${champDict[champId].alias}.png`;
};

export const trans2Chinese = (tier: string) => {
	switch (tier) {
		case "CHALLENGER":
			return "王者";
		case "GRANDMASTER":
			return "宗师";
		case "MASTER":
			return "大师";
		case "DIAMOND":
			return "钻石";
		case "EMERALD":
			return "翡翠";
		case "PLATINUM":
			return "铂金";
		case "GOLD":
			return "黄金";
		case "SILVER":
			return "白银";
		case "BRONZE":
			return "青铜";
		case "IRON":
			return "黑铁";
	}
};

// 处理段位数据
export const dealDivsion = (divsion: string) => {
	return divsion === "NA" ? "" : divsion;
};
