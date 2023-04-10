import '../App.css';
import React from "react";
import { AudioRecorder } from 'react-audio-voice-recorder';
import axios from "axios";
import { useEffect, useState, useRef } from "react";

import Chat from '../components/Chat';

const MessageRoomPage = ({apiKey}) => {

    const [audios, setAudios] = useState([]);
    const [transcriptions, setTranscriptions] = useState([]);
    const [texts, setTexts] = useState([]);
    const [chats, setChats] = useState([]);
    const [audioClickAble, setAudioClickAble] = useState(false);

    const sendAudio = async function (blob) {
        const headers = {
            "content-type": "multipart/form-data",
            //"Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            "Authorization": `Bearer ${apiKey}`
        };

        const formData = new FormData();
        formData.append("file", blob , "test.mp3")
        formData.append("model", "whisper-1")
        const response = await axios.post("https://api.openai.com/v1/audio/transcriptions", formData, { headers })
        console.log(response)
        console.log(response.data.text)
        return response.data.text
    }


    async function sendText(audioUrl, audioBlob) {
        try {
            const transcription = await sendAudio(audioBlob);

            console.log(transcription)
            setTranscriptions([...transcriptions.slice(0, transcriptions.length), transcription]);
            const headers = {
              "content-type": "application/json",
              "Authorization": `Bearer ${apiKey}`
            //   "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
            };

            const jsonData = {messages: [{role:"user", content:transcription}], model:"gpt-3.5-turbo"}
            const response = await axios.post("https://api.openai.com/v1/chat/completions", jsonData, { headers })
            console.log(response)
            const chat = response.data.choices[0].message.content
            setChats([...chats, [audioUrl, transcription, chat]])
            return response.data.choices[0].message.content
        }
        catch (error){
            console.log(error)
        }
      
    }

    const addAudioElement = async function (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudios([...audios, audioUrl]);

        // enforce the length of three lists are equal
        setTexts([...texts, null]);
        setTranscriptions([...transcriptions, null]);

        const returnText = await sendText(audioUrl, audioBlob);
        setTexts([...texts.slice(0, texts.length), returnText]);
    };

    const resetConversation = () => {
        setAudios([]);
        setChats([]);
        setTranscriptions([]);
        setTexts([]);
    }

    useEffect(() => {
       console.log(chats)
    }, [chats]);

    return (
        <div className="App" style={{marginTop:"30px"}}>
            <div className='msg-container'>
              {
              // chats.map((chat, index)=> (
              //   <Chat key={index} audio={chat[0]} transcription={chat[1]} text={chat[2]}/>
              // ))
              audios.map((audio, index)=> (
                <Chat key={index} audio={audios[index]} transcription={transcriptions[index]} text={texts[index]}/>
              ))
              }
            </div>
            <div style={{position:"fixed",  left: '50%', top: '95%',
                      transform: 'translate(-50%, -50%)', background:"#99ccff", "maxWidth":"750px", width:"100%", height:"70px", borderRadius:"8px", boxShadow:"1px 1px"}}></div>
            <div style={{position: 'fixed', left: '50%', top: '95%',
                      transform: 'translate(-50%, -50%)', display:"flex", justifyContent: "space-between", width: "300px"}}>
                <AudioRecorder onRecordingComplete={addAudioElement}/>
                <button className='circle-button' disabled={false}  onClick={resetConversation}><ion-icon name="trash" style={{fontSize: "17px"}}></ion-icon></button>
            </div>

        </div>
    );
}

export default MessageRoomPage;
