import { MESSAGE_TYPE } from "../utils/enums";

export const HEADER_ARRAY = [
	"TimeWise",
	"Optimize Your Time Management Skills",
];

export const WELCOME_MESSAGE = {
	type: MESSAGE_TYPE.TEXT,
	content: {
		message: "Hello, this is TimeWise! Ask me anything!",
		sender: "GPT",
		direction: "incoming",
		position: "single",
	},
};
