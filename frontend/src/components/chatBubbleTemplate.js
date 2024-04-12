import { Message, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { MESSAGE_TYPE } from "../utils/enums";
import { PieChart, LineChart, CalendarChart, RadarChart } from "./nivoCharts";

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
		></Message>
	);
};

const _getNivoChartsTemplate = (i, message, type) => {
	// const chartData = message.message;
	const chartData = message.message;
	let content;
	switch (type) {
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
					<LineChart data={chartData} />
				</div>
			);
			break;
		case MESSAGE_TYPE.CALENDAR_CHART:
			content = (
				<div className="calendarchart-container">
					<CalendarChart data={chartData} />
				</div>
			);
			break;
		case MESSAGE_TYPE.RADAR_CHART:
			content = (
				<div className="radarchart-container">
					<RadarChart data={chartData} />
				</div>
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
		></Message>
	);
};

const _getDashboardTemplate = (i, message) => {
	const dashboardData = message.message;

	return (
		<Message
			key={i}
			model={{
				sender: "GPT",
				direction: "incoming",
				position: "single",
				payload: (
					<Message.CustomContent>
						<div className="dashboard-container">
							{dashboardData.map((item) => {
								const dummyObj = {
									message: item,
								};
								// debugger;
								let template = _getNivoChartsTemplate(
									i,
									dummyObj,
									item.TYPE,
									true
								);
								console.log("template", template);
								return template;
							})}
						</div>
					</Message.CustomContent>
				),
			}}
		></Message>
	);
};

export const chatBubbleTemplate = (message, i) => {
	console.log("Raw Message", message);
	switch (message.type) {
		case MESSAGE_TYPE.TEXT:
			return <Message key={i} model={message.content} />;
		case MESSAGE_TYPE.IMAGE:
			return <></>;
		case MESSAGE_TYPE.OPTION:
			return <></>;
		case MESSAGE_TYPE.TABLE:
			return _getTableTemplate(i, message.content);
		case MESSAGE_TYPE.PIE_CHART:
		case MESSAGE_TYPE.LINE_CHART:
		case MESSAGE_TYPE.CALENDAR_CHART:
		case MESSAGE_TYPE.RADAR_CHART:
			return _getNivoChartsTemplate(i, message, message.type);
		// case MESSAGE_TYPE.DASHBOARD:
		// 	return _getDashboardTemplate(i, message.content);
		default:
			return <></>;
	}
};

export const typingIndicatorTemplate = () => {
	return <TypingIndicator content="TimeWise is thinking" />;
};
