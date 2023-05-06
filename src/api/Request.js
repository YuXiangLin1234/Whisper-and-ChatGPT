import fs from "fs";
import Qs from 'qs';
import axios from "axios";

import { createSilentAudio } from 'create-silent-audio';

const chatgptModel = "gpt-3.5-turbo";
const urlForWhisper = "https://os859pda3vi31cbq.us-east-1.aws.endpoints.huggingface.cloud";
// const urlForWhisper = "https://api-inference.huggingface.co/models/Evan-Lin/whisper-large-v1-tw";
const urlForChatgpt = "https://api.openai.com/v1/chat/completions";

const whisperModel = "whisper-1";
// const urlForWhisper = "https://api.openai.com/v1/audio/transcriptions";
async function validateApiKey(apiKey){
  try{
      const headers = {
          "content-type": "application/json",
          "Authorization": `Bearer ${apiKey}`
      };
      const messages = [
              {"role": "user", "content": "Hello!"}
          ]
      const jsonData = {messages: messages, model: chatgptModel}
      const response = await axios.post(urlForChatgpt, jsonData, { headers:headers })
      return true;
  }
  catch (error) {
      console.log(error);
      return false;
  }
}

async function validateHfToken(hfToken){
    try{
		const fakeAudio = createSilentAudio(5, 44100);
        const blob = new Blob([fakeAudio], {type: "audio/webm;codecs=opus"});

        const headers = {
			"Authorization": `Bearer ${hfToken}`,
            "Content-Type": "audio/webm;codecs=opus"
		};   

		const response = await axios.post(urlForWhisper, blob, {"headers": headers})
        return true
	}
	catch (error){
		console.log(error.response.data.error);
		if (error.response.data.error === "Authorization header is correct, but the token seems invalid")
			return false
		else 
			return true
	}
}

async function checkModelStatus(hfToken){
    try{
		const fakeAudio = createSilentAudio(5, 44100);
        const blob = new Blob([fakeAudio], {type: "audio/webm;codecs=opus"});

        const headers = {
			"Authorization": `Bearer ${hfToken}`,
            "Content-Type": "audio/webm;codecs=opus"
		};   

		const response = await axios.post(urlForWhisper, blob, {"headers": headers})
		console.log(response.status)
        return true
	}
	catch (error){
        console.log(error)
		console.log(error.response.status);
		if (error.response.status === 503)
			return false
		else 
			return true
	}
}

const sendAudioRequestOpenAi = async function (blob, apiKey) {      
    try{
        const headers = {
            "content-type":  "multipart/form-data",
            "Authorization": `Bearer ${apiKey}`
        //   "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        };    
        const formData = new FormData();
        formData.append("file", blob , "audio.mp3")
        formData.append("model", whisperModel)
        
        const response = await axios.post(urlForWhisper, formData, {"headers": headers})
        const transcription = response.data.text;    
        return transcription
    }
    catch (error){
        console.log(error);
    }
}

const sendAudioRequest = async function (blob, hfToken) {      
    try{
        const headers = {
            "Authorization": `Bearer ${hfToken}`,
            "Content-Type": "audio/webm;codecs=opus"
        };    
        
        // For end-point api, which is x-www-form-urlencoded
        const headers_string = Qs.stringify({
            "Authorization": JSON.stringify(`Bearer ${hfToken}`),
            "Content-Type": JSON.stringify("audio/webm;codecs=opus")
        })

        const response = await axios.post(urlForWhisper, blob, {"headers": headers_string})
        const transcription = response.data.text;    
        return transcription
    }
    catch (error){
        console.log(error);
    }
}

async function sendTranslationRequest (transcription, apiKey) {
    try{
        const headers = {
            "content-type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        };
        const messages = [
                // TODO
                {"role": "system", "content": "Rewrite the sentence into a fluent Traditional Chinese one"},
                {"role": "user", "content": transcription}
            ]
        const jsonData = {messages: messages, model: chatgptModel}
        const response = await axios.post(urlForChatgpt, jsonData, { headers:headers })
        console.log(messages)
        const translation = response.data.choices[0].message.content
        return translation;
    }
    catch (error) {
        console.log(error);
    }
}

async function sendChatRequest(translation, translations, chats, apiKey) {
    try {
        const headers = {
            "content-type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        };
        const messages = [
                 {"role": "system", "content": "你是一個診前問診系統，病人會跟你說他目前的身體狀況，\
                                                病人通常會跟你講以下幾件事情:\n\n發病：什麼時候開始\
                                                注意到有症狀產生？誘發原因：症狀開始出現的時間點附近，\
                                                病人在什麼環境做了哪些事情？性質：症狀出現時的感覺、\
                                                症狀的特徵症狀散布：出現症狀的部位是否改變、或者隨著\
                                                身體的移動而有變化？嚴重程度：症狀何時最嚴重？有多嚴重？\
                                                \n\n請你利用獲得的訊息，來建立看診目標，可以從提出開放式\
                                                的問題開始，如果上述關於發病、誘發原因、性質、症狀散布、\
                                                嚴重程度有不清楚的地方，也可以請病人回答，然後觀察病人的\
                                                回覆，並給出建議。"},
            ]

        console.log(translations)
        // Multi-turn chats
        // FIXME: setState() is async, so the translations here are not updated,
        //        so constraint should be translations.length 
        //        to including the last translation
        for (let i = 0; i < translations.length; i ++){
            messages.push({"role": "user", "content": translations[i]});
            messages.push({"role": "assistant", "content": chats[i]});
        }
        messages.push({"role": "user", "content": translation});
        console.log(messages)
        const jsonData = {messages: messages, model: chatgptModel}
        const response = await axios.post(urlForChatgpt, jsonData, {headers: headers} )
        const chat = response.data.choices[0].message.content
        return chat;
    }
    catch (error){
        console.log(error)
    }
}

export {validateApiKey, checkModelStatus, sendAudioRequest, sendChatRequest, sendTranslationRequest, sendAudioRequestOpenAi, validateHfToken};