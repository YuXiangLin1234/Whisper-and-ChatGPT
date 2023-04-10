import '../App.css';
import React from "react";
import { useEffect, useState } from 'react';

import formatDate from '../functions/Utils';
import Loading from './Loading';

const Chat = ({audio, transcription, text}) => {
	const [sendTime, setSendTime] = useState("");
	const [respondTime, setRespondTime] = useState("");

	useEffect(() => {
		const date = new Date();
		setSendTime(formatDate(date));
	}, [transcription]);
	
	useEffect(() => {
		const date = new Date();
		setRespondTime(formatDate(date));
	}, [text])

	return (
		<div style={{margin:"20px"}}>
			{/* <div className='msg-inbox'>
			<div className='chats'> */}
			<div className='msg-page'>
				<div className="sent-chats">
					<div className='sent-chats-msg'>
						{
						// Set this to be null to avoid situation that return is empty
						audio !== null
							?
							<audio controls="True" src={audio}></audio>
							:
							<Loading/>
						}
						{
						transcription !== null
						?
						<>
						<p>{transcription}</p>
						<span className="chat-time">{sendTime}</span>
						</>
						:
						audio !== null
							?
								<Loading/>
							:
								<></>
						}
					</div>
					<div className='sent-chats-img'>
						<img className='chats-img' src="old.png"/>
					</div>
				</div>
				<div className="received-chats">
					{
					text !== null
					?
					<>
					<div className='received-chats-img'>
						<img className='chats-img' src="chatgpt.png"/>
					</div>
					<div className='received-msg'>
						<div className='received-msg-inbox'>
							<p>{text}</p>
							<span className="chat-time">{respondTime}</span>
						</div>
					</div>
					</>
					: 
					transcription !== null
					?
						<Loading/>					
					:
						<></>
					}
				</div>
			{/* </div>
			</div> */}
			</div>
		</div>
	)

}

export default Chat;