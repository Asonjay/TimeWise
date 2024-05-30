import { MESSAGE_TYPE } from "./ENUMS";

export const HEADER_ARRAY = [
	"TimeWise",
	"Optimize Your Time Management Skills",
];

export const WELCOME_MESSAGE = {
	type: MESSAGE_TYPE.TEXT,
	content: "Hello, this is TimeWise! Ask me anything!",
	sender: "model",
};

export const ADDITIONAL_MESSAGE = {
	type: MESSAGE_TYPE.TEXT,
	content:
		"Given your <u>busy schedule and family commitments</u>, how about allocating just <b>one hour each day</b> to the course?",
	sender: "model",
};

export const TYPING_INDICATOR_MESSAGE = "TimeWise is thinking🤔";

export const LLM_ROUTE = "http://localhost:5000/send_to_llm";

export const CHAT_HISTORY_ROUTE = "http://localhost:5000/chat_history";
