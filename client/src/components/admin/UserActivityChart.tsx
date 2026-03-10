import { Line } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface UserActivityChartProps {
	data: number[];
	labels: string[];
}

const UserActivityChart = ({ data, labels }: UserActivityChartProps) => {
	const hasData = data && data.length > 0 && data.some(d => d > 0);

	const chartData = {
		labels,
		datasets: [
			{
				label: 'Active Users',
				data,
				borderColor: 'rgb(168, 85, 247)',
				backgroundColor: 'rgba(168, 85, 247, 0.1)',
				fill: true,
				tension: 0.4,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				padding: 12,
				titleColor: '#fff',
				bodyColor: '#fff',
			},
		},
		scales: {
			y: {
				grid: { color: 'rgba(255, 255, 255, 0.1)' },
				ticks: { color: '#9ca3af' },
			},
			x: {
				grid: { display: false },
				ticks: { color: '#9ca3af' },
			},
		},
	};

	return (
		<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
			<h3 className="text-lg font-semibold text-gray-50 mb-4">User Activity</h3>
			<div className="h-64">
				{hasData ? (
					<Line data={chartData} options={options} />
				) : (
					<div className="flex flex-col items-center justify-center h-full gap-2">
						<i className="fa fa-chart-line text-gray-500 text-3xl"></i>
						<p className="text-gray-400">No activity data available</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default UserActivityChart;
