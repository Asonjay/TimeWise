import axios from "axios";

function _parseResponse(response) {
	// console.log("Receiving <- ");
	console.log(response);
	const message = response.data.replace(/\n/g, "").replace(/\\\\/g, "\\");

	const jsonMessage = JSON.parse(message);

	return {
		type: jsonMessage.TYPE,
		content: jsonMessage.CONTENT,
		sender: "model",
		parameter: jsonMessage.PARAMETER ? jsonMessage.PARAMETER : null,
		separator: jsonMessage.SEPARATOR ? jsonMessage.SEPARATOR : null,
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
