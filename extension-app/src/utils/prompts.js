import { MESSAGE_TYPE } from "./enums";

export const SYSTEM_PROMPT = {
	role: "system",
	content:
		"Explain things like you're talking to a software professional with 2 years of experience.",
};

export const WELCOME_PROMPT = {
	type: MESSAGE_TYPE.TEXT,
	message: "Hello, this is TimeWise! Ask me anything!",
	sentTime: "just now",
	sender: "GPT",
};
