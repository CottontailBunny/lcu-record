
import { useState, useEffect } from 'react';

import { MatchList } from '../../interface/MatchInfo';
import { Image } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getImgUrl } from '../../utils/methods';
import { Select, Pagination } from 'antd';
import './index.scss'

interface Props {
    matchList: MatchList[];
    onPageChange: (page: number) => void;
}

export default function ({ matchList, onPageChange }: Props) {
    console.log('matchlist', matchList);

    const [recordList, setRecordList] = useState<MatchList[]>([])
    const [current, setCurrent] = useState<number>(1)
    const [copyText, setCopyText] = useState<string>('');
    useEffect(() => {
        setRecordList(matchList);
    }, [matchList])
    const pageChange = (page: number) => {
        console.log('page', page);
        setCurrent(page);
        onPageChange(page);
    }
    const getRecentData = () => {
        console.log('recordList', recordList);
        let text = '';
        matchList.map(item => {
            console.log('item', item);
            text = text + `${item.role}${item.kda}${item.isWin ? '胜利' : '失败'};`
        });
        setCopyText(text)
        return text;
    }
    const modeChange = (value: string) => {
        console.log('e', value);
    }
    const obj2text = (obj: MatchList[]) => {
        let text = '';
        obj.map(item => {
            console.log('item', item);
            text = text + `${item.role}${item.kda}${item.isWin ? '胜利' : '失败'}\n`
        });
        return text;
    }
    return (
        <div className='record-list-container'>
            {/* <div className='top-box'>
                <CopyToClipboard text={copyText}
                    onCopy={getRecentData}>
                    <div className='copy-record'>复制近十场战绩</div>
                </CopyToClipboard>
                <Select
                    defaultValue="全部"
                    style={{ width: 120 }}
                    onChange={modeChange}
                    options={[
                        { value: '1', label: '全部' },
                        { value: '2', label: '单双排位' },
                        { value: '3', label: '经典匹配' },

                    ]}
                />
            </div> */}
            {
                Array.isArray(recordList) && recordList.length > 0 ?
                    <>
                        {recordList.map(item => {


                            return (
                                <div className={item.isWin ? 'win record-item' : 'fail record-item'}>
                                    <div className='left-box'>
                                        <Image
                                            width={40}
                                            height={40}
                                            src={getImgUrl(item.champId)}
                                        />

                                        <div className='center-text'>
                                            <div className='top-line'>
                                                <div className='mode'>{item.gameModel}</div>
                                                <div className='date'>{item.matchTime}</div>
                                            </div>
                                            <div className='kda'>{item.kda}</div>
                                        </div>
                                    </div>


                                    <div className='match-result'>{item.isWin ? '胜利' : '失败'}</div>
                                </div>


                            )
                        })
                        } </> :
                    <><div className='empty-wrap'>暂无数据(,,◕ ⋏ ◕,,)</div></>


            }
            <Pagination defaultCurrent={1} total={99} onChange={pageChange} current={current} />
        </div>
    )
}