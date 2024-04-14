import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveCalendar } from "@nivo/calendar";
import { ResponsiveRadar } from "@nivo/radar";

export const PieChart = ({ data }) => (
	<ResponsivePie
		theme={{
			text: {
				fontFamily: "Source Sans 3, sans-serif",
				fontSize: "14px",
			},
		}}
		data={data}
		margin={{ top: 30, right: 60, bottom: 30, left: 60 }}
		innerRadius={0.5}
		padAngle={0.7}
		cornerRadius={3}
		activeOuterRadiusOffset={8}
		borderWidth={1}
		borderColor={{
			from: "color",
			modifiers: [["darker", 0.2]],
		}}
		arcLinkLabelsSkipAngle={10}
		arcLinkLabelsTextColor="black"
		arcLinkLabelsThickness={2}
		arcLinkLabelsColor={{
			from: "color",
		}}
		arcLinkLabelsTextOffset={10}
		arcLabelsSkipAngle={10}
		arcLabelsTextColor={{
			from: "color",
			modifiers: [["darker", 2]],
		}}
		defs={[
			{
				id: "dots",
				type: "patternDots",
				background: "inherit",
				color: "rgba(255, 255, 255, 0.3)",
				size: 4,
				padding: 1,
				stagger: true,
			},
			{
				id: "lines",
				type: "patternLines",
				background: "inherit",
				color: "rgba(255, 255, 255, 0.3)",
				rotation: -45,
				lineWidth: 6,
				spacing: 10,
			},
		]}
		fill={[
			{
				match: {
					id: "ruby",
				},
				id: "dots",
			},
			{
				match: {
					id: "c",
				},
				id: "dots",
			},
			{
				match: {
					id: "go",
				},
				id: "dots",
			},
			{
				match: {
					id: "python",
				},
				id: "dots",
			},
			{
				match: {
					id: "scala",
				},
				id: "lines",
			},
			{
				match: {
					id: "lisp",
				},
				id: "lines",
			},
			{
				match: {
					id: "elixir",
				},
				id: "lines",
			},
			{
				match: {
					id: "javascript",
				},
				id: "lines",
			},
		]}
		// legends={[
		// 	{
		// 		anchor: "bottom",
		// 		direction: "row",
		// 		justify: false,
		// 		translateX: 0,
		// 		translateY: 56,
		// 		itemsSpacing: 0,
		// 		itemWidth: 100,
		// 		itemHeight: 18,
		// 		itemTextColor: "#999",
		// 		itemDirection: "left-to-right",
		// 		itemOpacity: 1,
		// 		symbolSize: 18,
		// 		symbolShape: "circle",
		// 		effects: [
		// 			{
		// 				on: "hover",
		// 				style: {
		// 					itemTextColor: "#000",
		// 				},
		// 			},
		// 		],
		// 	},
		// ]}
	/>
);

export const LineChart = ({ data }) => (
	<ResponsiveLine
		data={data}
		theme={{
			text: {
				fontFamily: "Source Sans 3, sans-serif",
				fontSize: "14px",
			},
		}}
		margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
		xScale={{ type: "point" }}
		yScale={{
			type: "linear",
			min: "auto",
			max: "auto",
			stacked: true,
			reverse: false,
		}}
		yFormat=" >-.2f"
		axisTop={null}
		axisRight={null}
		axisBottom={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: "transportation",
			legendOffset: 36,
			legendPosition: "middle",
			truncateTickAt: 0,
		}}
		axisLeft={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: "count",
			legendOffset: -40,
			legendPosition: "middle",
			truncateTickAt: 0,
		}}
		lineWidth={3}
		pointColor={{ theme: "background" }}
		pointBorderWidth={2}
		pointBorderColor={{ from: "serieColor", modifiers: [] }}
		pointLabelYOffset={-12}
		enableTouchCrosshair={true}
		useMesh={true}
		legends={[
			{
				anchor: "right",
				direction: "column",
				justify: false,
				translateX: 100,
				translateY: 0,
				itemsSpacing: 0,
				itemDirection: "left-to-right",
				itemWidth: 80,
				itemHeight: 20,
				itemOpacity: 0.75,
				symbolSize: 12,
				symbolShape: "circle",
				symbolBorderColor: "rgba(0, 0, 0, .5)",
				effects: [
					{
						on: "hover",
						style: {
							itemBackground: "rgba(0, 0, 0, .03)",
							itemOpacity: 1,
						},
					},
				],
			},
		]}
	/>
);

export const CalendarChart = ({ data, parameter }) => {
	return (
		<ResponsiveCalendar
			data={data}
			theme={{
				text: {
					fontFamily: "Source Sans 3, sans-serif",
					fontSize: "14px",
				},
			}}
			from={parameter.FROM_DATE}
			to={parameter.TO_DATE}
			emptyColor="#eeeeee"
			colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
			minValue="auto"
			margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
			monthBorderColor="#ffffff"
			dayBorderWidth={1}
			dayBorderColor="#ffffff"
			legends={[
				{
					anchor: "bottom-right",
					direction: "row",
					translateY: 36,
					itemCount: 4,
					itemWidth: 42,
					itemHeight: 36,
					itemsSpacing: 14,
					itemDirection: "right-to-left",
				},
			]}
		/>
	);
};

export const RadarChart = ({ data, parameter }) => (
	<ResponsiveRadar
		data={data}
		keys={parameter.KEYS}
		indexBy="taste"
		valueFormat=" >-.2f"
		margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
		borderColor={{ from: "color" }}
		gridLabelOffset={15}
		dotSize={10}
		dotColor={{ theme: "background" }}
		dotBorderWidth={2}
		colors={{ scheme: "nivo" }}
		blendMode="multiply"
		motionConfig="wobbly"
		legends={[
			{
				anchor: "top-left",
				direction: "column",
				translateX: -50,
				translateY: -40,
				itemWidth: 80,
				itemHeight: 20,
				itemTextColor: "#999",
				symbolSize: 12,
				symbolShape: "circle",
				effects: [
					{
						on: "hover",
						style: {
							itemTextColor: "#000",
						},
					},
				],
			},
		]}
	/>
);
