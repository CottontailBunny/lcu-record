import { useState, useEffect } from 'react';
import { invoke } from "@tauri-apps/api";
import {formatMathchInfo} from '../../utils/getMatchInfo';
import './index.scss'
import { querySummonerInfo } from '../../utils/curSummoner';
import {lcuSummonerInfo} from "../../interface/SummonerInfo";
import { MatchList } from '../../interface/MatchInfo';
import { Button,  Form, Input ,message, Space,Alert,} from 'antd';
import RecordList from '../recordList';
import CurSummoner from '../curSummoner';
export default function () {
    const [messageApi, contextHolder] = message.useMessage();
    const [matchList,setMatchList] = useState<MatchList[]>([]);
    const [curSummoner, setCurSummoner] = useState<any>([])
    const [curPage,setCurPage] = useState<any>(1)
    useEffect(()=>{
        init()
    },[])

    const onFinish =  (values: any) => {
        queryMatch(values.username)
    // alterToSumId(sumInfo.summonerId)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const init = () => {
        getBaseData();

    }
    const onPageChange = async (page:number) => {
        console.log('curSummonercurSummoner',curSummoner);
        // 1 0-9
        // 2 10-19
        // 3 20-29
        const {puuid} = curSummoner.summonerInfo;
        const begIndex =page == 1 ? (page-1)*9:(page-1)*9+1 ;
        const endIndex = begIndex+9;

        const recordInfo = await  formatMathchInfo(puuid,String(begIndex),String(endIndex));
        console.log('recod info',page,endIndex,puuid);
        
        setMatchList(recordInfo);

    }
    const queryMatch = async (username:string) => {
        console.log('username',username);
        const sumInfo:lcuSummonerInfo = await invoke('get_other_sum_by_name',{name:username})
        console.log(' sumInfo', sumInfo);
        const {puuid,summonerId} = sumInfo;
        const recordInfo = await  formatMathchInfo(puuid,'0','9');
        const curSumInfo = await querySummonerInfo(summonerId);
        setMatchList(recordInfo);
        setCurSummoner(curSumInfo);
        if (sumInfo?.httpStatus===404){
            messageApi.open({
                type: 'error',
                content: '该召唤师不存在！',
        
              });
          return
        }
    }
    const getBaseData = async (sumId?:number) => {
        const curSumInfo = await querySummonerInfo(sumId?sumId:undefined);
        console.log('curSumInfo', curSumInfo);
        queryMatch(curSumInfo
            ?.summonerInfo?.displayName);
        setCurSummoner(curSumInfo);
    }
    return (
        <div className='record-query-area'>
             {contextHolder}
             <CurSummoner info={curSummoner}/>
           <div className='queryMatch'>
           <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                style={{ maxWidth: 600 }}
               
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                     
                    name="username"
                    rules={[{ required: true, message: '请输入召唤师id' }]}
                >
                    <Input placeholder="搜索召唤师"/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                       查询
                    </Button>
                </Form.Item>
            </Form>
           </div>
            <RecordList matchList={matchList} onPageChange={onPageChange}/>
        </div>
    )
}