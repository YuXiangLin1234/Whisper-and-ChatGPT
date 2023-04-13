import '../App.css';
import React from "react";
import { useRef } from "react";

const AskKeyPage = ({setApiKey}) => {

    const inputRef = useRef();
    const handleKeyDown = (event) => {
        console.log(event)
        if (event.key === "Enter"){
            setApiKey(event.target.value)
        }
    }
    const handleClick = (event) => {
        try{
            setApiKey(inputRef.current.value)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="App ask-key-container" >
            <h2>Whisper + ChatGPT 術前問診系統</h2>
            <span>
                Api Key : <input type="text" onKeyDown={handleKeyDown} ref={inputRef}/>
            </span>
            <button onClick={handleClick}>確認</button>
        </div>
    );
}

export default AskKeyPage;
