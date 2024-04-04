import { MESSAGE_TYPE } from "../utils/enums";
import {
	Message,
	CustomContent,
	TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const _generateTableTemplate = (i, message) => {
	const tableData = message.message;

	const TableComponent = () => {
		return (
			<div className="table-users">
				<table cellSpacing="0">
					<thead>
						<tr>
							{tableData.headers.map((header, index) => (
								<th key={index}>{header}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{tableData.rows.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{row.map((cell, cellIndex) => (
									<td key={cellIndex}>{cell}</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	};

	// Parse the rest as <td> tags
	return (
		<Message
			key={i}
			model={{
				sender: "GPT",
				direction: "incoming",
				position: "single",
				payload: (
					<Message.CustomContent>
						<TableComponent />
					</Message.CustomContent>
				),
			}}
		></Message>
	);
};

export const chatBubbleTemplate = (message, i) => {
	switch (message.type) {
		case MESSAGE_TYPE.TEXT:
			return <Message key={i} model={message.content} />;
		case MESSAGE_TYPE.IMAGE:
			return <></>;
		case MESSAGE_TYPE.OPTION:
			return <></>;
		case MESSAGE_TYPE.TABLE:
			return _generateTableTemplate(i, message.content);
		case MESSAGE_TYPE.CHART:
			return <></>;
		default:
			return <></>;
	}
};

export const typingIndicatorTemplate = () => {
	return <TypingIndicator content="TimeWise is thinking" />;
};
