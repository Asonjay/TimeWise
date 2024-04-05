import axios from "axios";

function _parseResponse(response) {
	// console.log("Receiving <- ");
	// console.log(response.data);
	const message = response.data.message
		.replace(/\n/g, "")
		.replace(/\\\\/g, "\\");

	const jsonMessage = JSON.parse(message);

	return {
		type: jsonMessage.TYPE,
		content: {
			message: jsonMessage.CONTENT,
			sender: "model",
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
