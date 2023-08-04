// 查询本局战绩
import "./index.scss";
import { getGame, sendMsg } from "../../utils/gameFlow";
import { Image, Tag } from "antd";
import copy from "copy-to-clipboard";
import { useState, useEffect } from "react";
import noneImg from "../img/none.jpg";
import { MatchList } from "../../interface/MatchInfo";
import { ExcelChamp, lcuSummonerInfo } from "../../interface/SummonerInfo";
import PlayerItem from "../components/curPlayerItem";
import { Spin } from "antd";
interface Props {
	onSearch: (name: string) => void;
}
export interface Players {
	champId?: number;
	excelChamp: ExcelChamp[];
	kda: number;
	matchList: MatchList[];
	rankPoint: string[];
	summonerInfo: lcuSummonerInfo;
}
export default function (props: Props) {
	const { onSearch } = props;
	const [showTips, setTipsShow] = useState<boolean>(false);
	const [teamateInfo, setTeamateInfo] = useState<Players[]>([]);
	const [enemyInfo, setEnemyInfo] = useState<Players[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		getGame();
		getBaseInfo();
	}, []);

	const handleScore = (matchList: MatchList[]) => {
		let kills = 0;
		let deaths = 0;
		let assists = 0;
		matchList.map((item) => {
			kills = item.kills + kills;
			deaths = item.deaths + deaths;
			assists = item.assists + assists;
		});

		return (((kills + assists) / deaths) * 3).toFixed(1);
	};

	const handleData = (list: Players[]) => {
		list.forEach((el) => {
			if (el.matchList.length >= 5) {
				let kda = handleScore(el.matchList);
				el.kda = Number(kda);
			} else {
				el.kda = 0.1;
			}
		});
		list.filter((item) => item.kda).sort((a, b) => {
			return b.kda - a.kda;
		});

		return list;
	};
	const getBaseInfo = async () => {
		setIsLoading(true);
		const res = await getGame();
		let { enemy = [], teamate = [] } = res || {};
		enemy = handleData(enemy);
		teamate = handleData(teamate);
		setEnemyInfo(enemy);
		setTeamateInfo(teamate);
		setIsLoading(false);
	};

	const sendTo = (item: Players) => {
		const msg = formatText(item);
		sendMsg(msg);
	};

	const formatText = (item: Players) => {
		const { summonerInfo, matchList, kda } = item;
		const { displayName } = summonerInfo;
		let record = "近期战绩：";
		matchList.slice(0, 5).forEach((el) => {
			record += el.role + " " + el.kda + " ";
		});
		let str = `[${displayName}] ${record}`;
		copy(str);
		return str;
	};

	return (
		<div className='cur-game-container'>
			<div className='block-header'>
				本局信息
				<div className='right-box'>
					<div
						onMouseOver={() => {
							setTipsShow(true);
						}}
						onMouseLeave={() => {
							setTipsShow(false);
						}}>
						使用须知
					</div>
				</div>
				{showTips && (
					<div className='tip-box'>
						1.请先登录英雄联盟游戏
						<br />
						2.目前仅支持查询本区玩家战绩
						<br />
						3.部分大区（比如守望之海）无法查询战绩
						<br />
						4.[发送]战绩功能可能有是<span>限制发言、封号</span>
						等风险，请谨慎使用
						<br />
						5.有问题联系 tuziqwq@gmail.com
					</div>
				)}
			</div>
			<div onClick={getBaseInfo} className='refresh'>
				获取本局信息[点击刷新]
			</div>
			{isLoading && <Spin />}
			<>
				{!isLoading && (
					<>
						{enemyInfo.length === 0 && teamateInfo.length === 0 ? (
							<div className='empty-page'>
								<Image src={noneImg}></Image>
								暂无游戏数据
							</div>
						) : (
							<>
								<div className='title'>我方</div>
								{teamateInfo.map((item, index) => {
									return (
										<PlayerItem
											item={item}
											index={index}
											onSearch={onSearch}
											sendTo={sendTo}
											formatText={
												formatText
											}></PlayerItem>
									);
								})}

								<div>敌方</div>
								{enemyInfo.length !== 0 &&
									enemyInfo.map((item, index) => {
										return (
											<PlayerItem
												item={item}
												index={index}
												onSearch={onSearch}
												sendTo={sendTo}
												formatText={
													formatText
												}></PlayerItem>
										);
									})}
								{enemyInfo.length === 0 && (
									<div className='tips'>
										暂无数据
										<br />
										请在游戏开始加载后刷新数据
									</div>
								)}
							</>
						)}
					</>
				)}
			</>

			<div className='btm-tip'>
				请谨慎使用【发送】功能，有限制发言、封号等风险
			</div>
		</div>
	);
}
