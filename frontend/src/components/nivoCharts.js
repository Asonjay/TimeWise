import { ResponsivePie } from "@nivo/pie";
import { ResponsiveLine } from "@nivo/line";

export const PieChart = ({ data /* see data tab */ }) => (
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

export const LineChart = ({ data /* see data tab */ }) => (
	<ResponsiveLine
		data={data}
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
