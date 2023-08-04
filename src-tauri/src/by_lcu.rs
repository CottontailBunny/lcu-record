use tauri::{command};
use serde_json::Value;
use invoke_lcu::RESTClient;
use query_match::MatchList;
use lazy_static::lazy_static;
use std::time::{SystemTime, UNIX_EPOCH};
use crate::{lcu::invoke_lcu,lcu::query_match};


lazy_static!{
    static ref REST_CLIENT:RESTClient = RESTClient::new().unwrap();
}


#[command]
pub fn is_lcu_success() -> bool {
    let client = RESTClient::new();
    match client {
        Ok(_) => true,
        Err(err) => {
            println!("Error: {:?}", err);
            false
        }
    }
}



#[command]
pub async fn get_cur_sum() -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let res =  client.get("/lol-summoner/v1/current-summoner".to_string()).await.unwrap();
    Ok(res)
}

#[command]
pub async fn get_other_sum(summoner_id:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-summoner/v1/summoners/{}", summoner_id).to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
}
#[command]
pub async fn get_other_sum_by_name(name:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-summoner/v1/summoners?name={}", name).to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
}

#[command]
pub async fn get_cur_rank_point(puuid:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-ranked/v1/ranked-stats/{}", puuid).to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
}

#[command]
pub async fn get_excel_champ(summoner_id:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-collections/v1/inventories/{}/champion-mastery", summoner_id).to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
}
#[command]
pub async fn get_match_list(puuid:String,beg_index:String,end_index:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-match-history/v1/products/lol/{}/matches?begIndex={}&endIndex={}", puuid,beg_index,end_index).to_string();
    let res = match client.get(url).await {
        Ok(result) => result,
        Err(err) => return Err(err.to_string()),
    };
    Ok(res)
}
#[command]
pub async fn get_match_detail(game_id:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-match-history/v1/games/{}", game_id).to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
}



#[command]
pub async fn get_special_match(puuid:String,queue_id:i64) -> Result<Vec<MatchList>,String > {
    let client = &*REST_CLIENT;
    let mut match_vec:Vec<MatchList> = Vec::new();
    for i in 0..=4 {
        let url = format!("/lol-match-history/v1/products/lol/{}/matches?begIndex={}&endIndex={}",puuid,i*20,(i+1)*20);
        let match_s=client.get_match_list(url).await;
        if match_s.is_ok() {
            match_vec.extend(match_s.unwrap().get_simple_match(queue_id));
        }
    };
    Ok(match_vec)
}


// 获取聊天室信息
#[command]
pub async fn get_chat_info() -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-chat/v1/conversations").to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
  } 

// 查询当前会话（非游戏中会话
#[command]
pub async fn query_all_summoners (chatId:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-chat/v1/conversations/{}/messages",chatId).to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
}

#[command]
pub async fn send_msg_to (chatId:String,params:String) -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-chat/v1/conversations/{}/messages",chatId).to_string();
    let res =  client.post(url,params).await.unwrap();
    Ok(res)
}

// 查询当前对局信息
#[command]
pub async fn get_game_session () -> Result<Value, String> {
    let client = &*REST_CLIENT;
    let url = format!("/lol-gameflow/v1/session").to_string();
    let res =  client.get(url).await.unwrap();
    Ok(res)
  }

