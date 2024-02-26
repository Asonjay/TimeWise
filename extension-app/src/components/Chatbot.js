// import React from "react";
import { useState, useEffect } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { SYSTEM_PROMPT, WELCOME_PROMPT } from "../utils/prompts";
import { sendMessageToGPT } from "../utils/gptUtils";

function Chatbot({ setPage }) {
	const [messages, setMessages] = useState([WELCOME_PROMPT]);

	const [isTyping, setIsTyping] = useState(false);

	const handleSend = async (message) => {
		const newMessage = {
			message,
			direction: "outgoing",
			sender: "user",
		};

		const newMessages = [...messages, newMessage];

		setMessages(newMessages);
		setIsTyping(true);
		// this is a async function!!!!
		sendMessageToGPT(newMessages, setMessages, setIsTyping);
	};

	return (
		<div className="App">
			<div style={{ position: "relative", height: "800px", width: "700px" }}>
				<MainContainer>
					<ChatContainer>
						<MessageList
							scrollBehavior="smooth"
							typingIndicator={
								isTyping ? (
									<TypingIndicator content="TimeWise is typing" />
								) : null
							}
						>
							{messages.map((message, i) => {
								console.log(message);
								return <Message key={i} model={message} />;
							})}
						</MessageList>
						<MessageInput placeholder="Type message here" onSend={handleSend} />
					</ChatContainer>
				</MainContainer>
			</div>
		</div>
	);
}

export default Chatbot;
