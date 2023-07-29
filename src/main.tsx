import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css"; 
import {invoke} from '@tauri-apps/api'

invoke('is_lcu_success').then((isSuc)=>{
  if(isSuc){
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
         
          <App />
       
      </React.StrictMode>,
    );
  }else{
    ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
      <React.StrictMode>
         <div className="err-type">请先启动游戏再打开此软件</div>
      </React.StrictMode>,
    );
  }

})

