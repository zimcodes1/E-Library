interface Activity {
	id: number;
	user: string;
	action: string;
	book?: string;
	time: string;
	type: 'upload' | 'download' | 'review' | 'register';
}

interface RecentActivityListProps {
	activities: Activity[];
}

const RecentActivityList = ({ activities }: RecentActivityListProps) => {
	const getIcon = (type: string) => {
		switch (type) {
			case 'upload': return 'upload';
			case 'download': return 'download';
			case 'review': return 'star';
			case 'register': return 'user-plus';
			default: return 'circle';
		}
	};

	const getColor = (type: string) => {
		switch (type) {
			case 'upload': return 'text-green-400';
			case 'download': return 'text-blue-400';
			case 'review': return 'text-yellow-400';
			case 'register': return 'text-purple-400';
			default: return 'text-gray-400';
		}
	};

	return (
		<div className="bg-[#48576019] border border-gray-800 rounded-xl p-6">
			<h3 className="text-lg font-semibold text-gray-50 mb-4">Recent Activity</h3>
			<div className="space-y-4 max-h-96 overflow-y-auto no-scrollbar">
				{activities.length > 0 ? (
					activities.map((activity) => (
						<div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-gray-800 last:border-0">
							<div className={`w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center ${getColor(activity.type)}`}>
								<i className={`fa fa-${getIcon(activity.type)} text-sm`}></i>
							</div>
							<div className="flex-1">
								<p className="text-gray-300 text-sm">
									<span className="font-semibold text-gray-50">{activity.user}</span> {activity.action}
									{activity.book && <span className="text-purple-400"> "{activity.book}"</span>}
								</p>
								<p className="text-gray-500 text-xs mt-1">{activity.time}</p>
							</div>
						</div>
					))
				) : (
					<div className="flex flex-col items-center justify-center py-8 gap-2">
						<i className="fa fa-inbox text-gray-500 text-3xl"></i>
						<p className="text-gray-400">No recent activities</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default RecentActivityList;
