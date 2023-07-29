use std::time::Duration;
use reqwest::{header,Certificate};

// 构建和配置 reqwest::Client 实例，用于发送 HTTP 请求
pub(crate) fn build_reqwest_client(auth_token: Option<String>) -> reqwest::Client {
    let cert = Certificate::from_pem(include_bytes!("riotgames.pem")).unwrap();
    let mut headers = header::HeaderMap::new();
    println!("{:?},",headers);
    if let Some(token) = auth_token {
        let auth_header =
            header::HeaderValue::from_str(format!("Basic {}", token).as_str()).unwrap();
        println!("{:?}",auth_header );
        headers.insert("Authorization", auth_header);
    }

    reqwest::ClientBuilder::new()
        .add_root_certificate(cert)
        .default_headers(headers)
        .timeout(Duration::from_millis(3000))
        .build()
        .unwrap()
}
