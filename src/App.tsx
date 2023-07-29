import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { ConfigProvider } from 'antd';

import RecordBoard from "./pages/recordBoard";
import "./App.css";

function App() {
  return (
    <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#6AAFE6 ',
      },
    }}
  >
    <div className="container">
      {/* 系统异常 */}
      <RecordBoard />
    </div>
    </ConfigProvider>
  );
}

export default App;
