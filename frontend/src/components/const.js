import { MESSAGE_TYPE } from "../utils/enums";

export const HEADER_ARRAY = [
	"TimeWise - Optimize Your Time Management Skills",
	// "Optimize Your Time Management Skills",
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
