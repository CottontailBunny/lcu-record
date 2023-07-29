import { useState, useEffect } from "react";
import { FloatButton } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Image } from "antd";
import "./index.scss";

interface TProps {
	info: any;
}
// 当前用户数据/查询的用户信息
export default function ({ info }: TProps) {
	const [curSummoner, setCurSummoner] = useState<any>([]);
	const [showTips, setTipsShow] = useState<boolean>(false);
	useEffect(() => {
		setCurSummoner(info);
	}, [info]);

	return (
		<div className='cur-summoner-profile'>
			<div className='left-box'>
				<div className='avatar-box'>
					<Image
						width={60}
						height={60}
						src={curSummoner?.summonerInfo?.avaUrl}
					/>
					<div className='level'>
						{curSummoner?.summonerInfo?.summonerLevel}
					</div>
				</div>
				<div className='info-box'>
					<div className='name'>
						{curSummoner?.summonerInfo?.displayName}
					</div>
					<div className='rank'>{curSummoner?.rankPoint?.[0]}</div>
				</div>
			</div>
			<div className='right-box'>
				<div
					onMouseOver={() => {
						setTipsShow(true);
					}}
					onMouseLeave={() => {
						setTipsShow(false);
					}}>
					<FloatButton
						icon={<QuestionCircleOutlined />}
						type='primary'
						style={{ right: 30, top: 10 }}
					/>
				</div>
				{showTips && (
					<div className='tip-box'>
						1.请先登录英雄联盟游戏
						<br />
						2.目前仅支持查询本区玩家战绩
						<br />
						3.有问题联系 tuziqwq@gmail.com
					</div>
				)}
			</div>
		</div>
	);
}
