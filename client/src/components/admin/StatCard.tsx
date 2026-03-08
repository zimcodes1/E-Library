interface StatCardProps {
	title: string;
	value: string | number;
	icon: string;
	trend?: { value: number; isPositive: boolean };
	color?: 'purple' | 'blue' | 'green' | 'yellow';
}

const StatCard = ({ title, value, icon, trend, color = "purple" }: StatCardProps) => {
	const colorClasses = {
		purple: 'bg-purple-500/20 text-purple-400',
		blue: 'bg-blue-500/20 text-blue-400',
		green: 'bg-green-500/20 text-green-400',
		yellow: 'bg-yellow-500/20 text-yellow-400',
	};

	return (
		<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition">
			<div className="flex justify-between items-start">
				<div>
					<p className="text-gray-400 text-sm">{title}</p>
					<h3 className="text-3xl font-bold text-gray-50 mt-2">{value}</h3>
					{trend && (
						<p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
							<i className={`fa fa-arrow-${trend.isPositive ? 'up' : 'down'} mr-1`}></i>
							{Math.abs(trend.value)}% from last month
						</p>
					)}
				</div>
				<div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[color]}`}>
					<i className={`fa fa-${icon} text-xl`}></i>
				</div>
			</div>
		</div>
	);
};

export default StatCard;
