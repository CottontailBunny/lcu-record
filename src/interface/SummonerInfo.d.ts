export interface lcuSummonerInfo {
	accountId: number;
	displayName: string;
	internalName: string;
	nameChangeFlag: boolean;
	percentCompleteForNextLevel: number;
	privacy: string;
	profileIconId: number;
	puuid: string;
	rerollPoints: IRerollPoint;
	summonerId: number;
	summonerLevel: number;
	unnamed: boolean;
	xpSinceLastLevel: number;
	xpUntilNextLevel: number;
	httpStatus?: number;
	avaUrl?: string;
}

interface SumReslut {
	name: string;
	imgUrl: string;
	lv: number;
	xpSL: number;
	xpNL: number;
	puuid: string;
	currentId: number;
}

interface ExcelChamp {
	champImgUrl: string;
	champLevel: string;
	championPoints: string;
	champLabel: string;
}

export interface SumInfoRes {
	sumInfo: SumReslut;
	rankPoint: string[];
	excelChamp: ExcelChamp[];
}

export interface NoticeTypes {
	button_content: string;
	content: string;
	is_button: boolean;
	is_show: boolean;
	url: string;
	variant: string;
}

export interface HeaderTypes {
	page: number;
	handleChange: any;
	localSumId: number;
	sumId: number;
	matchMode: string;
	handleSelect: any;
}
