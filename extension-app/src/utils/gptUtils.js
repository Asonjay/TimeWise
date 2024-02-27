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
					message: data.choices[0].message.content,
					sender: "ChatGPT",
				},
			]);
			setIsTyping(false);
		});
}
