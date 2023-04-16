import './App.css';
import React from "react";
// import dotenv_defaults from "dotenv-defaults";
import { useEffect, useState } from "react";

import MessageRoomPage from "./containers/MessageRoomPage"
import AskKeyPage from './containers/AskKeyPage';
import useScript from './functions/UseScript';
// dotenv_defaults.config();

function App() {

    // useScript("https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.esm.js")
    useScript("https://cdn.jsdelivr.net/npm/ionicons/dist/ionicons/ionicons.js")
    const [apiKey, setApiKey] = useState("");

    return (
        <div className="App" style={{marginTop:"30px"}}>
            { apiKey.length
                ?
                <MessageRoomPage apiKey= {apiKey}/>
                :
                <AskKeyPage setApiKey = {setApiKey}/>
            }
        </div>
    );
}

export default App;
