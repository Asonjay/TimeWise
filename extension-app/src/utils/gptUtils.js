import { SYSTEM_PROMPT } from "./prompts";
const API_KEY = "";

const apiRequestBody = (apiMessages) => {
	return {
		model: "gpt-3.5-turbo",
		messages: [SYSTEM_PROMPT, apiMessages],
	};
};

export async function sendMessageToGPT(chatMessages, setMessages, setIsTyping) {
	let apiMessages = chatMessages.map((messageObject) => {
		return {
			role: messageObject.sender === "GPT" ? "assistant" : "user",
			content: messageObject.message,
		};
	});

	await fetch("https://api.openai.com/v1/chat/completions", {
		method: "POST",
		headers: {
			Authorization: "Bearer" + API_KEY,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(apiRequestBody(chatMessages)),
	})
		.then((data) => {
			return data.json();
		})
		.then((data) => {
			// GPT response structure
			console.log(data);

			// TODO: the usestate is back at main function
			setMessages([
				...chatMessages,
				{
					message: data.choices[0].message.content,
					sender: "GPT",
				},
			]);
			setIsTyping(false);
		});
}
