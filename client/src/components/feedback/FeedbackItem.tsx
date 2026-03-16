interface FeedbackItemProps {
  id: number;
  feedback_type: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  book_title?: string;
  admin_response?: string;
}

const FeedbackItem = ({
  feedback_type,
  title,
  description,
  status,
  priority,
  created_at,
  book_title,
  admin_response,
}: FeedbackItemProps) => {
  const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      bug: 'fa-bug',
      plagiarism: 'fa-copy',
      inappropriate: 'fa-exclamation-triangle',
      feature_request: 'fa-lightbulb',
      improvement: 'fa-arrow-up',
      other: 'fa-comment',
    };
    return icons[type] || 'fa-comment';
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      bug: 'Bug Report',
      plagiarism: 'Plagiarism Report',
      inappropriate: 'Inappropriate Content',
      feature_request: 'Feature Request',
      improvement: 'Improvement Suggestion',
      other: 'Other',
    };
    return labels[type] || type;
  };

  const getStatusColor = (s: string) => {
    const colors: Record<string, string> = {
      open: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
      in_progress: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      resolved: 'bg-green-500/10 text-green-400 border-green-500/30',
      closed: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
    };
    return colors[s] || colors.open;
  };

  const getPriorityColor = (p: string) => {
    const colors: Record<string, string> = {
      low: 'text-green-400',
      medium: 'text-yellow-400',
      high: 'text-red-400',
    };
    return colors[p] || colors.medium;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 rounded-lg bg-[#31303e] border border-gray-700 hover:border-gray-600 transition">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <i className={`fa ${getTypeIcon(feedback_type)} text-purple-400 mt-1`}></i>
          <div className="flex-1">
            <h3 className="text-gray-50 font-semibold">{title}</h3>
            <p className="text-gray-400 text-sm">{getTypeLabel(feedback_type)}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(status)}`}>
            {status.replace('_', ' ')}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getPriorityColor(priority)}`}>
            {priority}
          </span>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{description}</p>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <div className="flex gap-4">
          <span>{formatDate(created_at)}</span>
          {book_title && <span className="text-purple-400">Book: {book_title}</span>}
        </div>
      </div>

      {admin_response && (
        <div className="mt-3 p-3 bg-[#4857605a] rounded border border-gray-600">
          <p className="text-xs text-gray-400 mb-1">Admin Response:</p>
          <p className="text-gray-300 text-sm">{admin_response}</p>
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;
