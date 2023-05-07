import '../App.css';
import fs from "fs";
import React from "react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import { AudioRecorder } from 'react-audio-voice-recorder';

import Chat from '../components/Chat';
import Loading from '../components/Loading';

import { checkModelStatus, sendAudioRequest, sendTranslationRequest, sendChatRequest, sendAudioRequestOpenAi } from '../api/Request';

const MessageRoomPage = ({apiKey, hfToken}) => {

    const [modelReady, setModelReady] = useState(false);
    const [audios, setAudios] = useState([]);
    const [transcriptions, setTranscriptions] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [chats, setChats] = useState([]);
    const [audioClickAble, setAudioClickAble] = useState(false);
    
    async function sendRequests (audioUrl, audioBlob){
        // Hugging face
        // const transcription = await sendAudioRequest(audioBlob, hfToken);
        
        // OpenAI whisper
        const transcription = await sendAudioRequestOpenAi(audioBlob, apiKey);
        setTranscriptions([...transcriptions, transcription]);

        const translation = await sendTranslationRequest(transcription, apiKey);
        setTranslations([...translations, translation])

        const chat = await sendChatRequest(translation, translations, chats, apiKey);
        setChats([...chats, chat])
    }

    const addAudioElement = async function (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudios([...audios, audioUrl]);

        // enforce the length of three lists are equal
        setTranscriptions([...transcriptions, null]);
        setTranslations([...translations, null]);
        setChats([...chats, null]);

        await sendRequests(audioUrl, audioBlob);
    };

    const resetConversation = () => {
        setAudios([]);
        setTranscriptions([]);
        setTranslations([]);
        setChats([]);
    }

    useEffect(() => {
        // For Hugging face Whisper
        // const checkModelStatusWrapper = async() =>{
        //     const response = await checkModelStatus(hfToken)  
        //     console.log(response)
        //     if (response === true) 
        //         setModelReady(true)
        //     else
        //         setTimeout(checkModelStatusWrapper, 8000);
            
        //     return response      
        // }
        // checkModelStatusWrapper();
        setModelReady(true)
    }, []);

    return (
        <div className="App" style={{marginTop:"30px"}}>
            {
            modelReady 
            ?
                <>
                <div className='msg-container'>
                {
                audios.map((audio, index)=> (
                    <Chat key={index} audio={audios[index]} transcription={transcriptions[index]} 
                            translation={translations[index]} chat={chats[index]}/>
                ))
                }
                </div>
                <div className='bottom-line'></div>
                <div className='bottom-line-button'>
                    <AudioRecorder onRecordingComplete={addAudioElement}/>
                    <button className='circle-button' disabled={false}  onClick={resetConversation}>
                        <ion-icon name="trash" style={{fontSize: "17px"}}></ion-icon>
                    </button>
                </div>
                </>
            :
                <div className='center'>
                <h2>Wait for model loading</h2>
                <Loading/>
                </div>
            }
        </div>
    );
}

export default MessageRoomPage;
