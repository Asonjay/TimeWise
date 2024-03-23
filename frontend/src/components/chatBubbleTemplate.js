import { MESSAGE_TYPE } from "../utils/enums";
import { Message, Avatar, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import robotIco from "../assets/robot.jpg";

export const chatBubbleTemplate = (message, i) => {
	switch (message.type) {
		case MESSAGE_TYPE.TEXT:
			// console.log(message);
			// return (
			// 	<Message
			// 		model={{
			// 			direction: "incoming",
			// 			type: "custom",
			// 		}}
			// 	>
			// 		{/* <Avatar src={robotIco} /> */}
			// 		<Message.CustomContent>
			// 			<div class="typing-indicator">
			// 				{/* <div class="text">TimeWise is thinking</div> */}
			// 				<div class="dot-wrap">
			// 					<div class="dot"></div>
			// 					<div class="dot"></div>
			// 					<div class="dot"></div>
			// 				</div>
			// 			</div>
			// 		</Message.CustomContent>
			// 	</Message>
			// );
			return <Message key={i} model={message.content} />;
		case MESSAGE_TYPE.TEXT_WITH_IMAGE:
			return (
				<Message
					key={i}
					model={{ direction: "incoming", message: "image box" }}
				>
					{/* <Avatar src={robotIco} /> */}
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
					{/* <Avatar src={robotIco} /> */}
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
};

export const typingIndicatorTemplate = () => {
	return <TypingIndicator content="TimeWise is thinking" />;
};
