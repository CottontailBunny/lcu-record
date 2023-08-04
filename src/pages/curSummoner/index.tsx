import { useState, useEffect } from "react";
import { Image } from "antd";
import "./index.scss";

interface TProps {
	info: any;
}
// 当前用户数据/查询的用户信息
export default function ({ info }: TProps) {
	const [curSummoner, setCurSummoner] = useState<any>([]);

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
		</div>
	);
}
