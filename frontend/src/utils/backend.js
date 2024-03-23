import axios from "axios";

import { MESSAGE_TYPE } from "./enums";

function _parseResponse(response) {
	console.log("Receiving <- " + response);
	return {
		type: MESSAGE_TYPE.TEXT,
		content: {
			message: response.data.message,
			sender: "ChatGPT",
			position: "single",
			direction: "incoming",
		},
	};
}

export async function sendMessageToLLM(chatMessages, setMessages, setIsTyping) {
	// console.log("Sending -> " + chatMessages);

	await axios
		.post("http://localhost:5000/llm", {
			messages: chatMessages,
		})
		.then((response) => {
			setMessages([...chatMessages, _parseResponse(response)]);
			setIsTyping(false);
		})
		.catch((error) => {
			console.error(error);
		});
}
