import axios from "axios";

import { createSilentAudio } from 'create-silent-audio';
import ClinicSchedule from "../data/ClinicSchedule";

// OpenAI chatgpt
const chatgptModel = "gpt-3.5-turbo";
const urlForChatgpt = "https://api.openai.com/v1/chat/completions";

// Huggingface whisper
// TODO: This key will only valid for 3 days
const corsApiKey = "temp_51410de77c21fa5c219c4260fb4628dc"
const corsProxy = "https://6f67-114-36-131-122.ngrok-free.app/"


// Hugging Face
const urlForWhisper = `${corsProxy}https://z6jdmt46g8ep02t7.us-east-1.aws.endpoints.huggingface.cloud`;
// const urlForWhisper = "https://api-inference.huggingface.co/models/Evan-Lin/whisper-large-v1-tw";

// OpenAI whisper
const whisperModel = "whisper-1";
// const urlForWhisper = "https://api.openai.com/v1/audio/transcriptions";

// Local
// const urlForWhisper = "https://7e9a-114-36-122-223.ngrok-free.app"

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
            "Content-Type": "audio/webm;codecs=opus",
            "x-cors-api-key": corsApiKey    
		};   

		const response = await axios.post(urlForWhisper, blob, {"headers": headers})
        return true
	}
	catch (error){
		console.log(error);
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
            "Content-Type": "audio/webm;codecs=opus",
            "x-cors-api-key": corsApiKey   
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
    const headers = {
        "content-type":  "multipart/form-data",
        "Authorization": `Bearer ${apiKey}`
    //   "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
    };    
    const formData = new FormData();
    formData.append("file", blob , "audio.mp3")
    formData.append("model", whisperModel)
    formData.append("language", "zh")

    try{
        const response = await axios.post(urlForWhisper, formData, {"headers": headers})
        const transcription = response.data.text;    
        return transcription
    }
    catch (error){
        console.log(error)
        if (error.response.status === 429){
            const response = await axios.post(urlForWhisper, formData, {"headers": headers})
            const transcription = response.data.text 
            return transcription
        }
        else 
            return ""
    }
}

const sendAudioRequestLocal = async function (blob) {      
    try{
        const headers = {
            "content-type":  "multipart/form-data",
        };   
        const formData = new FormData();
        formData.append("audio_file", blob , "audio.wav")

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
            "authorization": `Bearer ${hfToken}`,
            // "content-type": "application/json",
            "content-type": "audio/webm;codecs=opus",
            "accept": "application/json",
        };    
        
        const response = await axios.post(urlForWhisper, blob, {"headers": headers})
        const transcription = response.data.text;    
        return transcription
    }
    catch (error){
        console.log(error);
    }
}

async function sendTranslationRequest (transcription, apiKey) {
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
    try{
        const response = await axios.post(urlForChatgpt, jsonData, { headers:headers })
        const translation = response.data.choices[0].message.content
        return translation;
    }
    catch (error) {
        console.log(error);
        if (error.response.status === 429){
            const response = await axios.post(urlForChatgpt, jsonData, { headers:headers })
            const translation = response.data.choices[0].message.content
            return translation;
        }
        else 
            return ""        
    }
}

async function sendChatRequest(translation, translations, chats, apiKey) {
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
                                            回覆，並用繁體中文給出建議。"},
        ]

    console.log(translations)
    // Multi-turn chats
    // FIXME: setState() is async, so the translations here are not updated.
    //        translations doesn't contain translation(The newest one).
    for (let i = 0; i < translations.length; i ++){
        messages.push({"role": "user", "content": translations[i]});
        messages.push({"role": "assistant", "content": chats[i]});
    }
    messages.push({"role": "user", "content": translation});
    console.log(messages)
    const jsonData = {messages: messages, model: chatgptModel}
    try {
        const response = await axios.post(urlForChatgpt, jsonData, {headers: headers} )
        const chat = response.data.choices[0].message.content
        return chat;
    }
    catch (error){
        console.log(error)
        if (error.response.status === 429){
            const response = await axios.post(urlForChatgpt, jsonData, {headers: headers} )
            const chat = response.data.choices[0].message.content
            return chat;
        }
        else 
            return ""    
    }
}

async function sendSummaryRequest(translations, apiKey) {
    const headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };
    const messages = [
                {"role": "system", "content": "你是一個重點整理系統，病人會跟你說他目前的身體狀況，\
                                                通常會包含以下 4 個面向:\n\n發病時間、症狀的誘發原因、\
                                                症狀的性質、嚴重程度 。請你利用獲得的訊息，針對這些面向 \
                                                進行重點整理，最後用繁體中文給出總結（你不需要給出建議，\
                                                只需要客觀的統整重點即可）。"},
        ]

    messages.push({"role": "user", "content": "病人的描述："})

    for (let i = 0; i < translations.length; i ++){
        messages.push({"role": "user", "content": translations[i]});
    }
    console.log(messages)
    const jsonData = {messages: messages, model: chatgptModel}
    try {
        const response = await axios.post(urlForChatgpt, jsonData, {headers: headers} )
        const chat = response.data.choices[0].message.content
        return chat;
    }
    catch (error){
        console.log(error)
        if (error.response.status === 429){
            const response = await axios.post(urlForChatgpt, jsonData, {headers: headers} )
            const chat = response.data.choices[0].message.content
            return chat;
        }
        else 
            return ""    
    }
}

async function sendClinicRequest(summary, apiKey) {
    const headers = {
        "content-type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };
    const messages = [
                {"role": "system", "content": "根據病人的描述及門診時間表，找出門診時間表中 \
                                        「專長」一項符合病人症狀的醫生，並告知這些醫生對應的 \
                                        診別及門診時間。請以繁體中文回答。"},
        ]

    messages.push({"role": "user", "content": "病人的症狀："});
    messages.push({"role": "user", "content": summary})

    messages.push({"role": "user", "content": "門診時間表："});
    for (let i = 0; i < ClinicSchedule.length; i ++){
        messages.push({"role": "user", "content": ClinicSchedule[i]});
    }    
    console.log(messages)
    const jsonData = {messages: messages, model: chatgptModel}
    try {
        const response = await axios.post(urlForChatgpt, jsonData, {headers: headers} )
        const chat = response.data.choices[0].message.content
        return chat;
    }
    catch (error){
        console.log(error)
        if (error.response.status === 429){
            const response = await axios.post(urlForChatgpt, jsonData, {headers: headers} )
            const chat = response.data.choices[0].message.content
            return chat;
        }
        else 
            return ""    
    }
}

export {validateApiKey, checkModelStatus, sendAudioRequest,
         sendChatRequest, sendTranslationRequest, sendAudioRequestOpenAi,
         validateHfToken, sendSummaryRequest, sendClinicRequest, sendAudioRequestLocal};