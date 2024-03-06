import { MESSAGE_TYPE } from "./enums";
import { SYSTEM_PROMPT } from "./prompts";

const API_KEY = "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";
const OPENAI_MODEL = "gpt-3.5-turbo";

const apiRequestBody = (apiMessages) => {
	return {
		model: OPENAI_MODEL,
		messages: [SYSTEM_PROMPT, ...apiMessages],
	};
};

export async function sendMessageToGPT(chatMessages, setMessages, setIsTyping) {
	console.log(chatMessages);
	let apiMessages = chatMessages.map((messageObject) => {
		return {
			role: messageObject.sender === "GPT" ? "assistant" : "user",
			content: messageObject.message,
		};
	});

	console.log(apiRequestBody(apiMessages));

	await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: "Bearer " + API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(apiRequestBody(apiMessages)),
	})
		.then((data) => {
			return data.json();
		})
		.then((data) => {
			console.log(data);
			setMessages([
				...chatMessages,
				{
					type: MESSAGE_TYPE.TEXT,
					message: data.choices[0].message.content,
					sender: "ChatGPT",
					position: "single",
				},
			]);
			setIsTyping(false);
		});
}
