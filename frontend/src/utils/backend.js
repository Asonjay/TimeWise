import axios from "axios";
import { ROUTES } from "./ENUMS";

function _parseResponse(response) {
	// Assuming response is an array of response objects
	console.log(response);

	return response.map((item) => {
		const message = item.data.replace(/\n/g, "").replace(/\\\\/g, "\\");
		const jsonMessage = JSON.parse(message);

		return {
			type: jsonMessage.TYPE,
			content: jsonMessage.CONTENT,
			sender: "model",
			parameter: jsonMessage.PARAMETER ? jsonMessage.PARAMETER : null,
			separator: jsonMessage.SEPARATOR ? jsonMessage.SEPARATOR : null,
		};
	});
}

export async function sendMessageToLLM(
	credential,
	chatMessages,
	setMessages,
	setIsTyping
) {
	// console.log("Sending -> " + chatMessages);
	await axios
		.post("http://localhost:5000/send_to_llm", {
			credential: credential.email,
			messages: chatMessages,
		})
		.then((response) => {
			setMessages([...chatMessages, ..._parseResponse(response)]);
			setIsTyping(false);
		})
		.catch((error) => {
			console.error(error);
		});
}

export async function getChatHistory(
	credential,
	setIsLoading,
	setPage,
	setMessages
) {
	await axios
		.post("http://localhost:5000/get_chat_history", {
			credential: credential.email,
		})
		.then((response) => {
			console.log("response_gch:" + response);
			setIsLoading(false);
			setPage(ROUTES.CHATBOT);
			setMessages([..._parseResponse(response)]);
		})
		.catch((error) => {
			console.error(error);
		});
}
