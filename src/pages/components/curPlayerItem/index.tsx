import { Players } from "../../curGame";
import { getImgUrl } from "../../../utils/methods";
import { Image } from "antd";
import "./index.scss";
interface Props {
	item: Players;
	index?: number;
	onSearch: (name: string) => void;
	sendTo: (item: Players) => void;
	formatText: (item: Players) => void;
}
export default function (props: Props) {
	const { item, onSearch, sendTo, formatText } = props;
	const { summonerInfo, rankPoint, champId } = item;
	return (
		<div className='player-item'>
			<div className='left-box'>
				<Image
					width={30}
					height={30}
					src={
						champId
							? getImgUrl(champId.toString())
							: summonerInfo.avaUrl
					}
				/>

				<div className='center-text'>
					<div className='top-line'>
						<div className='name'>{summonerInfo.displayName}</div>
					</div>
					<div className='rank'>单双：{rankPoint?.[0]}</div>
				</div>

				<div className='center-tag'>
					<div>
						kda:
						{item.kda > 0.1 ? item.kda : "数据不足"}
					</div>
					{/* {index === 0 && item.kda && item.kda > 5 && (
						<Tag color='cyan' bordered={false}>
							上等马
						</Tag>
					)}
					{index === 5 && item.kda < 7 && (
						<Tag color='error' bordered={false}>
							下等马
						</Tag>
					)} */}
				</div>
			</div>

			<div className='options'>
				<div
					className='btn view-detail'
					onClick={() => {
						onSearch(summonerInfo.displayName);
					}}>
					查看
				</div>
				<div className='btn send-to-game' onClick={() => sendTo(item)}>
					发送
				</div>
				<div className='btn copy-text' onClick={() => formatText(item)}>
					复制
				</div>
			</div>
		</div>
	);
}
