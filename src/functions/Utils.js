import axios from "axios";

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date) {
  return (
    [
    //   date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('/') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')
  );
}

async function validateApiKey(apiKey){
  const chatgptModel = "gpt-3.5-turbo";
  const urlForChatgpt = "https://api.openai.com/v1/chat/completions";
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

export {formatDate, validateApiKey};