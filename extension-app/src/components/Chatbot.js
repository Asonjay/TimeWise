import React from "react";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	Avatar,
	MessageInput,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { WELCOME_PROMPT } from "../utils/prompts";
import { sendMessageToGPT } from "../utils/gptUtils";
import { MESSAGE_TYPE } from "../utils/enums";
import "../index.css";
import robotIco from "../assets/robot.jpg";

function Chatbot({ setPage }) {
	const [messages, setMessages] = useState([WELCOME_PROMPT]);
	const [messageType, setMessageType] = useState(MESSAGE_TYPE.TEXT);
	const [isTyping, setIsTyping] = useState(false);

	const handleSend = async (message) => {
		const newMessage = {
			type: MESSAGE_TYPE.TEXT_WITH_BUTTONS,
			message,
			direction: "outgoing",
			sender: "user",
			position: "single",
		};

		const newMessages = [...messages, newMessage];
		// const newMessageTypes = [...messageType, MESSAGE_TYPE.TEXT];
		setMessages(newMessages);
		setIsTyping(true);
		await sendMessageToGPT(newMessages, setMessages, setIsTyping);
	};

	const sayHello = () => {
		alert("Hello!");
	};

	const renderTextChatBox = (message, i) => {
		switch (message.type) {
			case MESSAGE_TYPE.TEXT:
				return (
					<Message key={i} model={message}>
						<Avatar src={robotIco} />
					</Message>
				);

			case MESSAGE_TYPE.TEXT_WITH_IMAGE:
				return (
					<Message key={i} model={{ direction: "incoming" }}>
						<Avatar src={robotIco} />
						<Message.ImageContent
							src={robotIco}
							width={100}
						></Message.ImageContent>
						<Message key={i} model={message}>
							<Avatar src={robotIco} />
						</Message>
					</Message>
				);
			case MESSAGE_TYPE.TEXT_WITH_BUTTONS:
				return (
					<Message
						model={{
							direction: "incoming",
							payload: (
								<Message.CustomContent>
									<strong>This is strong text</strong>
									<div class="outer">
										<div class="inner">
											<button
												style={{
													background: "white",
													border: "2px solid black",
												}}
												onClick={sayHello}
											>
												Are you tired?
											</button>
										</div>
										<div class="inner">
											<button
												style={{
													background: "white",
													border: "2px solid black",
												}}
												onClick={sayHello}
											>
												Take a break
											</button>
										</div>
										<div class="inner">
											<button
												style={{
													background: "white",
													border: "2px solid black",
												}}
												onClick={sayHello}
											>
												Save
											</button>
										</div>
									</div>
									<input
										id="openAIKey"
										name="openAIKey"
										type="text"
										className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										placeholder="sk-...1234" // Replace with your OpenAI key
										defaultValue={"123"} // default value
										required
									/>
								</Message.CustomContent>
							),
						}}
					>
						<Avatar src={robotIco} />
					</Message>
				);
			default:
				return <></>;
		}
	};

	return (
		<div className="App">
			<div className="chatbot-container">
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
								return renderTextChatBox(message, i);
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
