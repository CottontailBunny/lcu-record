import { useState, useEffect } from "react";
import { MatchList } from "../../interface/MatchInfo";
import { Image } from "antd";
import { getImgUrl } from "../../utils/methods";
import { Pagination } from "antd";
import "./index.scss";

interface Props {
	matchList: MatchList[];
	onPageChange: (page: number) => void;
}

export default function ({ matchList, onPageChange }: Props) {
	const [recordList, setRecordList] = useState<MatchList[]>([]);
	const [current, setCurrent] = useState<number>(1);
	useEffect(() => {
		setRecordList(matchList);
	}, [matchList]);
	const pageChange = (page: number) => {
		setCurrent(page);
		onPageChange(page);
	};

	return (
		<div className='record-list-container'>
			{Array.isArray(recordList) && recordList.length > 0 ? (
				<>
					{recordList.map((item) => {
						return (
							<div
								className={
									item.isWin
										? "win record-item"
										: "fail record-item"
								}>
								<div className='left-box'>
									<Image
										width={40}
										height={40}
										src={getImgUrl(item.champId)}
									/>

									<div className='center-text'>
										<div className='top-line'>
											<div className='mode'>
												{item.gameModel}
											</div>
											<div className='date'>
												{item.matchTime}
											</div>
										</div>
										<div className='kda'>{item.kda}</div>
									</div>
								</div>

								<div className='match-result'>
									{item.isWin ? "胜利" : "失败"}
								</div>
							</div>
						);
					})}
				</>
			) : (
				<>
					<div className='empty-wrap'>暂无数据(,,◕ ⋏ ◕,,)</div>
				</>
			)}
			<Pagination
				defaultCurrent={1}
				total={99}
				onChange={pageChange}
				current={current}
			/>
		</div>
	);
}
