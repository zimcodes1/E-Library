import { useState } from 'react';

interface FeedbackFormProps {
  onSubmit: (data: {
    feedback_type: string;
    title: string;
    description: string;
    book?: number | null;
    priority: string;
  }) => void;
  loading?: boolean;
  books?: Array<{ id: number; title: string }>;
}

const FeedbackForm = ({ onSubmit, loading, books = [] }: FeedbackFormProps) => {
  const [feedbackType, setFeedbackType] = useState('bug');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [priority, setPriority] = useState('medium');

  const feedbackTypes = [
    { value: 'bug', label: 'Bug Report', icon: 'fa-bug' },
    { value: 'plagiarism', label: 'Plagiarism Report', icon: 'fa-copy' },
    { value: 'inappropriate', label: 'Inappropriate Content', icon: 'fa-exclamation-triangle' },
    { value: 'feature_request', label: 'Feature Request', icon: 'fa-lightbulb' },
    { value: 'improvement', label: 'Improvement Suggestion', icon: 'fa-arrow-up' },
    { value: 'other', label: 'Other', icon: 'fa-comment' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    onSubmit({
      feedback_type: feedbackType,
      title,
      description,
      book: selectedBook,
      priority,
    });

    setTitle('');
    setDescription('');
    setSelectedBook(null);
    setPriority('medium');
  };

  const isValid = title.trim() && description.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Feedback Type
        </label>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-2">
          {feedbackTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => setFeedbackType(type.value)}
              className={`p-3 rounded-lg border-2 transition text-left ${
                feedbackType === type.value
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 bg-[#31303e] hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-2">
                <i className={`fa ${type.icon} text-purple-400`}></i>
                <span className="text-sm text-gray-200">{type.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief summary of your feedback"
          className="w-full px-4 py-2 bg-[#31303e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
          maxLength={255}
          required
        />
        <p className="text-xs text-gray-400 mt-1">{title.length}/255</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide detailed information about your feedback..."
          className="w-full px-4 py-2 bg-[#31303e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 resize-none"
          rows={5}
          maxLength={2000}
          required
        />
        <p className="text-xs text-gray-400 mt-1">{description.length}/2000</p>
      </div>

      {books.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Related Book (Optional)
          </label>
          <select
            value={selectedBook || ''}
            onChange={(e) => setSelectedBook(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-4 py-2 bg-[#31303e] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
          >
            <option value="">Select a book...</option>
            {books.map((book) => (
              <option key={book.id} value={book.id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Priority
        </label>
        <div className="flex gap-3">
          {['low', 'medium', 'high'].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`flex-1 py-2 rounded-lg border-2 transition capitalize ${
                priority === p
                  ? p === 'high'
                    ? 'border-red-500 bg-red-500/10 text-red-400'
                    : p === 'medium'
                    ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                    : 'border-green-500 bg-green-500/10 text-green-400'
                  : 'border-gray-600 text-gray-300 hover:border-gray-500'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid || loading}
        className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition font-medium"
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};

export default FeedbackForm;
