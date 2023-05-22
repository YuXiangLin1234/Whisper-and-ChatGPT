import '../App.css';
import React from "react";
import { useRef } from "react";

import { validateHfToken, validateApiKey } from '../api/Request';

const AskKeyPage = ({setApiKey, setHfToken}) => {

    const hfTokenRef = useRef();
    const apiKeyRef = useRef();
    const emptyInputRef = useRef();
    const apiKeyValidRef = useRef();
    const hfTokenValidRef = useRef();

    const validator = async () => {
        try{
            const apiKey = apiKeyRef.current.value
            const hfToken = hfTokenRef.current.value
            if (apiKey.length === 0 || hfToken.length === 0){
                emptyInputRef.current.style.display = "inline";
                apiKeyValidRef.current.style.display = "none";
                hfTokenValidRef.current.style.display = "none";                    
                return
            }
            else 
                emptyInputRef.current.style.display = "none";
            
            const apiKeyValid = await validateApiKey(apiKey);
            const hfTokenValid = await validateHfToken(hfToken)
            
            if (apiKeyValid === true && hfTokenValid === true){
                setApiKey(apiKey)
                setHfToken(hfToken)
                apiKeyValidRef.current.style.display = "none";
                hfTokenValidRef.current.style.display = "none";
            }
            else {
                if (apiKeyValid === false) 
                    apiKeyValidRef.current.style.display = "inline";
                else 
                    apiKeyValidRef.current.style.display = "none";
                if (hfTokenValid === false)
                    hfTokenValidRef.current.style.display = "inline";
                else
                    hfTokenValidRef.current.style.display = "none";
            }
        }
        catch (error){
            console.log(error)
        }
    }

    const handleKeyDown = async (event) => {
        if (event.key === "Enter")
            validator()
    }

    const handleClick = async (event) => {
        validator()
    }

    return (
        <div className="App ask-key-container" >
            <h2>診前問診系統</h2>
            <br/><br/>
            <div className='ask-key-component'>
                <span>
                    OpenAI Api Key : &nbsp; &emsp;&nbsp;<input type="text" onKeyDown={handleKeyDown} ref={apiKeyRef}/>
                </span>
                <br/><br/>
                <span>
                    Huggingface Token : &nbsp;<input type="text" onKeyDown={handleKeyDown} ref={hfTokenRef}/>
                </span>
            </div>
            <br/><br/>
            <button onClick={handleClick}>確認</button>
            <div className="error" ref={emptyInputRef} style={{"display": "none"}}>
                <h3 style={{"color":"red"}}>Error!</h3>
                <p style={{"color":"red"}}>Please ensure that both two input box are filled</p>
            </div> 
            <div className="error" ref={apiKeyValidRef} style={{"display": "none"}}>
                <h3 style={{"color":"red"}}>Error!</h3>
                <p style={{"color":"red"}}>Please ensure that a correct OpenAI apikey is provided</p>
            </div> 
            <div className="error" ref={hfTokenValidRef} style={{"display": "none"}}>
                <h3 style={{"color":"red"}}>Error!</h3>
                <p style={{"color":"red"}}>Please ensure that a correct huggingface token is provided</p>
            </div> 
        </div>
    );
}

export default AskKeyPage;
