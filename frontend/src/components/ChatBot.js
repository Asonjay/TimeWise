import React from "react";
import { useState } from "react";
import {
	MainContainer,
	ChatContainer,
	ConversationHeader,
	InfoButton,
	MessageList,
	MessageInput,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { TypingHeader } from "./TypingHeader";
import { sendMessageToLLM } from "../utils/backend";
import { getChatBubbleTemplate } from "./getChatBubbleTemplate";
import { MESSAGE_TYPE } from "../utils/enums";
import { WELCOME_MESSAGE } from "./CONSTANTS";

function Chatbot() {
	const [messages, setMessages] = useState([WELCOME_MESSAGE]);
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
		setMessages(newMessages);
		setIsTyping(true);
		await sendMessageToLLM(newMessages, setMessages, setIsTyping);
	};

	console.log("Messages", messages);
	console.log("--------------------------------------");

	return (
		<div className="App">
			<div className="chatbot-container">
				<MainContainer>
					<ChatContainer>
						<ConversationHeader>
							<ConversationHeader.Back />
							<ConversationHeader.Content>
								<TypingHeader />
							</ConversationHeader.Content>
							<ConversationHeader.Actions>
								<InfoButton title="Show Info" />
							</ConversationHeader.Actions>
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
								return getChatBubbleTemplate(message, i);
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
