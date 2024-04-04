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
import { sendMessageToLLM } from "../utils/backend";
import { MESSAGE_TYPE } from "../utils/enums";
import { chatBubbleTemplate } from "./chatBubbleTemplate";

const _CONTENT_HEADER = "🤖TimeWise🤖";
const _WELCOME_MESSAGE = {
	type: MESSAGE_TYPE.TEXT,
	content: {
		message: "Hello, this is TimeWise! Ask me anything!",
		sender: "GPT",
		direction: "incoming",
		position: "single",
	},
};

function Chatbot({ setPage }) {
	const [messages, setMessages] = useState([_WELCOME_MESSAGE]);
	// const [messageType, setMessageType] = useState(MESSAGE_TYPE.TEXT);
	const [isTyping, setIsTyping] = useState(false);

	const handleSend = async (message) => {
		const newMessage = {
			type: MESSAGE_TYPE.TEXT,
			content: {
				message,
				sender: "user",
				direction: "outgoing",
				position: "single",
			},
		};

		const newMessages = [...messages, newMessage];
		// const newMessageTypes = [...messageType, MESSAGE_TYPE.TEXT];
		setMessages(newMessages);
		setIsTyping(true);
		await sendMessageToLLM(newMessages, setMessages, setIsTyping);
	};

	console.log("messages", messages);
	console.log("--------------------------------------");

	return (
		<div className="App">
			<div className="chatbot-container">
				<MainContainer>
					<ChatContainer>
						<ConversationHeader>
							<ConversationHeader.Content userName={_CONTENT_HEADER} />
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
