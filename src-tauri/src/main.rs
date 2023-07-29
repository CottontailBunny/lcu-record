// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
use crate::{
    win_utils::{set_window_shadow},
};

mod win_utils;
mod lcu;
mod by_lcu;

// 声明 win_utils 的模块。在同一目录下，名为 win_utils.rs 或者 win_utils/mod.rs 的文件
fn main() {
    println!("fsdfsdf");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            by_lcu::is_lcu_success,
            by_lcu::get_cur_sum,
            by_lcu::get_other_sum,
            by_lcu::get_other_sum_by_name,
            by_lcu::get_cur_rank_point,
            by_lcu::get_excel_champ,
            by_lcu::get_match_list,
            by_lcu::get_match_detail,
            by_lcu::get_special_match,
            ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
