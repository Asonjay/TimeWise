import {
	Message,
	Avatar,
	MessageSeparator,
} from "@chatscope/chat-ui-kit-react";
import { MESSAGE_TYPE } from "../utils/ENUMS";
import {
	PieChart,
	LineChart,
	CalendarChart,
	RadarChart,
	BarChart,
} from "./nivoCharts";
import RobotIcon from "../assets/timewise5-circled.png";

const _getTextTemplate = (i, message) => (
	<>
		{message.separator && <MessageSeparator content={message.separator} />}
		<Message
			key={i}
			model={{
				sender: message.sender,
				direction: message.sender === "user" ? "outgoing" : "incoming",
				position: "single",
				payload: message.content,
			}}
		>
			{message.sender !== "user" && <Avatar src={RobotIcon} />}
		</Message>
	</>
);

const _getTableTemplate = (i, message) => {
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
		>
			<Avatar src={RobotIcon} />
		</Message>
	);
};

const _getNivoChartsTemplate = (i, message) => {
	const chartData = message.content;
	// debugger;
	const chartParam = message.parameter;
	let content;
	switch (message.type) {
		case MESSAGE_TYPE.PIE_CHART:
			content = (
				<div className="piechart-container">
					<PieChart data={chartData} />
				</div>
			);
			break;
		case MESSAGE_TYPE.LINE_CHART:
			content = (
				<div className="linechart-container">
					<LineChart data={chartData} parameter={chartParam} />
				</div>
			);
			break;
		case MESSAGE_TYPE.CALENDAR_CHART:
			content = (
				<>
					<div className="calendarchart-container">
						<CalendarChart data={chartData} parameter={chartParam} />
					</div>
					<div>
						It appears that you prefer to study more diligently biweekly. Is
						there any specific reason for this pattern? 🤔
					</div>
				</>
			);
			break;
		case MESSAGE_TYPE.RADAR_CHART:
			content = (
				<>
					<div className="radarchart-container">
						<RadarChart data={chartData} parameter={chartParam} />
					</div>
					<div className="radarchart-text">
						{" "}
						Great job on actively participating in class! However, it appears
						that there’s room for improvement in self-regulation.
					</div>
				</>
			);
			break;
		case MESSAGE_TYPE.BAR_CHART:
			content = (
				<>
					<div className="barchart-container">
						<BarChart data={chartData} parameter={chartParam} />
					</div>
					<div className="barchart-text">
						{" "}
						Here is your learning pattern. What can you learn from it? 🤔
					</div>
				</>
			);
			break;

		default:
			break;
	}

	return (
		<Message
			key={i}
			model={{
				sender: "GPT",
				direction: "incoming",
				position: "single",
				payload: <Message.CustomContent>{content}</Message.CustomContent>,
			}}
		>
			<Avatar src={RobotIcon} />
		</Message>
	);
};

const _getSeparatorTemplate = (message) => {
	<MessageSeparator>{message.content}</MessageSeparator>;
};
// const _getDashboardTemplate = (i, message) => {
// 	const dashboardData = message.message;

// 	return (
// 		<Message
// 			key={i}
// 			model={{
// 				sender: "GPT",
// 				direction: "incoming",
// 				position: "single",
// 				payload: (
// 					<Message.CustomContent>
// 						<div className="dashboard-container">
// 							{dashboardData.map((item) => {
// 								const dummyObj = {
// 									message: item,
// 								};
// 								// debugger;
// 								let template = _getNivoChartsTemplate(
// 									i,
// 									dummyObj,
// 									item.TYPE,
// 									true
// 								);
// 								console.log("template", template);
// 								return template;
// 							})}
// 						</div>
// 					</Message.CustomContent>
// 				),
// 			}}
// 		>
// 			<Avatar src={RobotIcon} />
// 		</Message>
// 	);
// };

export const getChatBubbleTemplate = (message, i) => {
	console.log("Raw Message", message);

	switch (message.type) {
		case MESSAGE_TYPE.TEXT:
			return _getTextTemplate(i, message);
		case MESSAGE_TYPE.IMAGE:
			return <></>;
		case MESSAGE_TYPE.OPTION:
			return <></>;
		case MESSAGE_TYPE.TABLE:
			return _getTableTemplate(i, message);
		case MESSAGE_TYPE.PIE_CHART:
		case MESSAGE_TYPE.LINE_CHART:
		case MESSAGE_TYPE.CALENDAR_CHART:
		case MESSAGE_TYPE.RADAR_CHART:
		case MESSAGE_TYPE.BAR_CHART:
			return _getNivoChartsTemplate(i, message);
		// case MESSAGE_TYPE.DASHBOARD:
		// 	return _getDashboardTemplate(i, message.content);
		case MESSAGE_TYPE.SEPARATOR:
			return _getSeparatorTemplate(message);
		default:
			return <></>;
	}
};
