import { MESSAGE_TYPE } from "../utils/enums";
import { Message, Avatar } from "@chatscope/chat-ui-kit-react";
import robotIco from "../assets/robot.jpg";

export const chatBubbleTemplate = (messages, messageTypes) => {
	messages.map((message, i) => {
		switch (message.type) {
			case MESSAGE_TYPE.TEXT:
				return (
					<Message key={i} model={message.info}>
						<Avatar src={robotIco} />
					</Message>
				);
			case MESSAGE_TYPE.TEXT_WITH_IMAGE:
				return (
					<Message
						key={i}
						model={{ direction: "incoming", message: "image box" }}
					>
						<Avatar src={robotIco} />
						<Message.ImageContent
							src={robotIco}
							width={100}
						></Message.ImageContent>
					</Message>
				);
			case MESSAGE_TYPE.TEXT_WITH_BUTTONS:
				return (
					<Message
						model={{
							direction: "incoming",
							type: "custom",
						}}
					>
						<Avatar src={robotIco} />
						<Message.CustomContent>
							<strong>This is strong text</strong>
							<br />
							Message content is provided as{" "}
							<span style={{ color: "red" }}> custom elements</span> from child{" "}
							<strong>Message.CustomContent</strong> element
							<button type="button">Click Me!</button>
							<button type="button">Click Me!</button>
							<button type="button">Click Me!</button>
						</Message.CustomContent>
					</Message>
				);
			default:
				return <></>;
		}
	});
};
