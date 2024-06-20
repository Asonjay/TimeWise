import axios from "axios";
import { ROUTES } from "./ENUMS";
import { BACKEND_URL } from "./CONSTANTS";

function _parseResponse(response) {
	// Access the data property which can be an array of JSON strings or a single JSON string
	function convertKeysToLowercase(obj) {
		if (Array.isArray(obj)) {
			return obj.map(convertKeysToLowercase);
		} else if (obj !== null && typeof obj === "object") {
			return Object.keys(obj).reduce((acc, key) => {
				const lowerCaseKey = key.toLowerCase();
				acc[lowerCaseKey] = convertKeysToLowercase(obj[key]);
				return acc;
			}, {});
		}
		return obj;
	}

	const data = response.data;
	console.log("Response:", data);
	const dataArray = Array.isArray(data) ? data : [data];

	// Convert all keys to lowercase
	const processedDataArray = dataArray.map((item) => {
		if (typeof item === "string") {
			try {
				const jsonObject = JSON.parse(item);
				return convertKeysToLowercase(jsonObject);
			} catch (e) {
				console.error("Invalid JSON string:", item);
				return item;
			}
		} else if (typeof item === "object" && item !== null) {
			return convertKeysToLowercase(item);
		}
		return item;
	});

	return processedDataArray;
}

export async function sendMessageToLLM(
	credential,
	chatMessages,
	setMessages,
	setIsTyping
) {
	// console.log("Sending -> " + chatMessages);
	await axios
		.post(BACKEND_URL + "/send_message", {
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
		.post(BACKEND_URL + "/chat_history", {
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
