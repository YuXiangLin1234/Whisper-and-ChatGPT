import '../App.css';
import React from "react";
import { useEffect, useState, useRef } from "react";

import { AudioRecorder } from 'react-audio-voice-recorder';

import Chat from '../components/Chat';
import Loading from '../components/Loading';

import { enableButton, disableButton } from '../functions/Utils';
import { checkModelStatus, sendAudioRequest, sendTranslationRequest, 
        sendChatRequest, sendAudioRequestOpenAi, sendSummaryRequest,
        sendClinicRequest } from '../api/Request';


const MessageRoomPage = ({apiKey, hfToken}) => {

    const [modelReady, setModelReady] = useState(false);
    const [audios, setAudios] = useState([]);
    const [transcriptions, setTranscriptions] = useState([]);
    const [translations, setTranslations] = useState([]);
    const [chats, setChats] = useState([]);
    const [summary, setSummary] = useState("");
    
    const summaryButtonRef = useRef();
    const reportLoadingRef = useRef();
    const bottomLineRef = useRef();
    const recordButtonRef = useRef();
    const clearButtonRef = useRef();

    async function sendRequests (audioUrl, audioBlob){
        // Hugging face whisper
        const transcription = await sendAudioRequest(audioBlob, hfToken);
        setTranscriptions([...transcriptions, transcription]); 
        
        // OpenAI whisper
        // const transcription = await sendAudioRequestOpenAi(audioBlob, apiKey);
        // setTranscriptions([...transcriptions, transcription]);

        const translation = await sendTranslationRequest(transcription, apiKey);
        setTranslations([...translations, translation])

        const chat = await sendChatRequest(translation, translations, chats, apiKey);
        setChats([...chats, chat])

    }

    const addAudioElement = async function (audioBlob) {
        summaryButtonRef.current.style.display = "none";
        disableButton(recordButtonRef)
        disableButton(clearButtonRef)

        const audioUrl = URL.createObjectURL(audioBlob);
        setAudios([...audios, audioUrl]);

        // enforce the length of three lists are equal
        setTranscriptions([...transcriptions, null]);
        setTranslations([...translations, null]);
        setChats([...chats, null]);

        await sendRequests(audioUrl, audioBlob);

        summaryButtonRef.current.style.display = "inline";
        enableButton(recordButtonRef)
        enableButton(clearButtonRef)
    };

    const generateReport = async function() {
        bottomLineRef.current.style.display = "none";
        summaryButtonRef.current.style.display = "none";
        reportLoadingRef.current.style.display = "inline";
        
        const summary = await sendSummaryRequest(translations, apiKey);
        setSummary(summary);
        console.log(summary)
        reportLoadingRef.current.style.display = "none";
    }

    const resetConversation = () => {
        summaryButtonRef.current.style.display = "none";
        setAudios([]);
        setTranscriptions([]);
        setTranslations([]);
        setChats([]);
        setSummary([]);
    }

    useEffect(() => {
        // For Hugging face Whisper
        const checkModelStatusWrapper = async() =>{
            const response = await checkModelStatus(hfToken)  
            console.log(response)
            if (response === true) 
                setModelReady(true)
            else
                setTimeout(checkModelStatusWrapper, 8000);
            
            return response      
        }
        checkModelStatusWrapper();
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
                    <button className="button-rectangle" ref={summaryButtonRef} onClick={generateReport} style={{"display": "none"}}>生成病理報告</button>
                    <div className='center'  ref={reportLoadingRef}  style={{"display": "none"}}>
                        <h2>Wait for report generation</h2>
                        <Loading/>
                    </div>
                </div>
                <div ref={bottomLineRef}>
                    <div className='bottom-line'></div>
                    <div className='bottom-line-button'>
                        <div ref={recordButtonRef}>
                            <AudioRecorder onRecordingComplete={addAudioElement}/>
                        </div>
                        <button className='circle-button' ref={clearButtonRef} onClick={resetConversation}  >
                            <ion-icon name="trash" style={{fontSize: "17px"}}></ion-icon>
                        </button>
                    </div>
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
