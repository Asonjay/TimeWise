import React from "react";
import { useState } from "react";
import {
	MainContainer,
	ChatContainer,
	ConversationHeader,
	// InfoButton,
	MessageList,
	MessageInput,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { TypingHeader } from "./TypingHeader";
import { sendMessageToLLM } from "../utils/api";
import { getChatBubbleTemplate } from "./getChatBubbleTemplate";
import { ROUTES, MESSAGE_TYPE } from "../utils/ENUMS";
import {
	// WELCOME_MESSAGE,
	// ADDITIONAL_MESSAGE,
	TYPING_INDICATOR_MESSAGE,
} from "../utils/CONSTANTS";

function Chatbot({ setPage, credential, messages, setMessages }) {
	// const [messages, setMessages] = useState([
	// 	// WELCOME_MESSAGE,
	// 	ADDITIONAL_MESSAGE,
	// ]);
	// const [messageType, setMessageType] = useState(MESSAGE_TYPE.TEXT);
	const [isTyping, setIsTyping] = useState(false);

	const handleSend = async (message) => {
		const newMessage = {
			content: message,
			type: MESSAGE_TYPE.TEXT,
			sender: "user",
		};

		const newMessages = [...messages, newMessage];
		setMessages(newMessages);
		setIsTyping(true);
		await sendMessageToLLM(credential, newMessages, setMessages, setIsTyping);
	};

	console.log("---------------------");
	console.log("Messages Renderred:", messages);
	console.log("---------------------");

	return (
		<div className="App">
			<div className="chatbot-container">
				<MainContainer>
					<ChatContainer>
						<ConversationHeader>
							<ConversationHeader.Back
								onClick={() => {
									setPage(ROUTES.GENERATOR);
								}}
							/>
							<ConversationHeader.Content>
								<TypingHeader />
							</ConversationHeader.Content>
							{/* <ConversationHeader.Actions>
								<InfoButton title="Show Info" />
							</ConversationHeader.Actions> */}
						</ConversationHeader>
						<MessageList
							scrollBehavior="auto"
							typingIndicator={
								isTyping ? (
									<TypingIndicator content={TYPING_INDICATOR_MESSAGE} />
								) : null
							}
							autoScrollToBottom={true}
						>
							{messages.map((message, i) => {
								return getChatBubbleTemplate(message, i);
							})}
						</MessageList>
						<div as={MessageInput}>
							<MessageInput
								placeholder={
									isTyping
										? " ⏳ Wait for response... ⏳"
										: "💬 Type message here 💬"
								}
								onSend={handleSend}
								attachButton={false}
								disabled={isTyping}
							/>
						</div>
					</ChatContainer>
				</MainContainer>
			</div>
		</div>
	);
}

export default Chatbot;
