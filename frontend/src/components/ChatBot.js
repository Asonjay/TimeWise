import React from "react";
import { useState } from "react";
import {
	MainContainer,
	ChatContainer,
	ConversationHeader,
	MessageList,
	MessageInput,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { WELCOME_PROMPT } from "../utils/prompts";
import { sendMessageToLLM } from "../utils/backend";
import { MESSAGE_TYPE } from "../utils/enums";
import { chatBubbleTemplate } from "./chatBubbleTemplate";
import { useBorderToggle } from "./customHook";

function Chatbot({ setPage }) {
	const [messages, setMessages] = useState([WELCOME_PROMPT]);
	const [messageType, setMessageType] = useState(MESSAGE_TYPE.TEXT);
	const [isTyping, setIsTyping] = useState(false);

	// useBorderToggle();

	const handleSend = async (message) => {
		const newMessage = {
			type: MESSAGE_TYPE.TEXT,
			content: {
				message,
				direction: "outgoing",
				sender: "user",
				position: "single",
			},
		};

		const newMessages = [...messages, newMessage];
		// const newMessageTypes = [...messageType, MESSAGE_TYPE.TEXT];
		setMessages(newMessages);
		setIsTyping(true);
		await sendMessageToLLM(newMessages, setMessages, setIsTyping);
	};

	return (
		<div className="App">
			<div className="chatbot-container">
				<MainContainer>
					<ChatContainer>
						<ConversationHeader>
							<ConversationHeader.Content userName="🤖TimeWise🤖" />
						</ConversationHeader>
						<MessageList
							scrollBehavior="auto"
							typingIndicator={
								isTyping ? (
									<TypingIndicator content="TimeWise is thinking" />
								) : null
							}
							autoScrollToBottom={true}
						>
							{messages.map((message, i) => {
								return chatBubbleTemplate(message, i);
							})}
						</MessageList>
						<MessageInput
							placeholder="Type message here"
							onSend={handleSend}
							attachButton={false}
						/>
					</ChatContainer>
				</MainContainer>
			</div>
		</div>
	);
}

export default Chatbot;
