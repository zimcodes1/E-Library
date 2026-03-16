import { useState } from 'react';
import FeedbackItem from './FeedbackItem';

interface Feedback {
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

interface FeedbackListProps {
  feedbacks: Feedback[];
  loading?: boolean;
  emptyMessage?: string;
}

const FeedbackList = ({
  feedbacks,
  loading,
  emptyMessage = 'No feedback submitted yet',
}: FeedbackListProps) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const filteredFeedbacks = feedbacks.filter((f) => {
    const statusMatch = filterStatus === 'all' || f.status === filterStatus;
    const typeMatch = filterType === 'all' || f.feedback_type === filterType;
    return statusMatch && typeMatch;
  });

  const feedbackTypes = [
    { value: 'bug', label: 'Bug Reports' },
    { value: 'plagiarism', label: 'Plagiarism' },
    { value: 'inappropriate', label: 'Inappropriate' },
    { value: 'feature_request', label: 'Features' },
    { value: 'improvement', label: 'Improvements' },
    { value: 'other', label: 'Other' },
  ];

  const statuses = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin">
          <i className="fa fa-spinner text-purple-400 text-3xl"></i>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col max-sm:gap-3 gap-4 max-sm:flex-col">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Type
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filterType === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#31303e] text-gray-300 hover:bg-[#3a3947]'
              }`}
            >
              All
            </button>
            {feedbackTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setFilterType(type.value)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filterType === type.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#31303e] text-gray-300 hover:bg-[#3a3947]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Status
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1 rounded-full text-sm transition ${
                filterStatus === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-[#31303e] text-gray-300 hover:bg-[#3a3947]'
              }`}
            >
              All
            </button>
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`px-3 py-1 rounded-full text-sm transition ${
                  filterStatus === status.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#31303e] text-gray-300 hover:bg-[#3a3947]'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredFeedbacks.length === 0 ? (
        <div className="text-center py-12">
          <i className="fa fa-inbox text-gray-500 text-4xl mb-3 block"></i>
          <p className="text-gray-400">{emptyMessage}</p>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm text-gray-400">
            Showing {filteredFeedbacks.length} of {feedbacks.length} feedback
          </p>
          {filteredFeedbacks.map((feedback) => (
            <FeedbackItem key={feedback.id} {...feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
