import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryDistributionChartProps {
	data: number[];
	labels: string[];
}

const CategoryDistributionChart = ({ data, labels }: CategoryDistributionChartProps) => {
	const chartData = {
		labels,
		datasets: [
			{
				data,
				backgroundColor: [
					'rgba(168, 85, 247, 0.8)',
					'rgba(59, 130, 246, 0.8)',
					'rgba(16, 185, 129, 0.8)',
					'rgba(245, 158, 11, 0.8)',
					'rgba(239, 68, 68, 0.8)',
				],
				borderColor: '#1f2937',
				borderWidth: 2,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom' as const,
				labels: { color: '#9ca3af', padding: 15 },
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.8)',
				padding: 12,
			},
		},
	};

	return (
		<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
			<h3 className="text-lg font-semibold text-gray-50 mb-4">Books by Category</h3>
			<div className="h-64">
				<Doughnut data={chartData} options={options} />
			</div>
		</div>
	);
};

export default CategoryDistributionChart;
