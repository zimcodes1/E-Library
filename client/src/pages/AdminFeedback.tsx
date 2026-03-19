import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from '../components/ui/Preloader';
import Message from '../components/ui/Message';
import { adminService } from '../utils/admin/adminService';
import { isAdminSessionValid } from '../utils/adminAuth';

interface Feedback {
  id: number;
  feedback_type: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  admin_response?: string;
  book_title?: string;
  user: {
    id: number;
    username: string;
    avatar_url: string;
  };
}

const AdminFeedback = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [adminResponse, setAdminResponse] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    document.title = 'Feedback Management | Libronet Admin';
    if (!isAdminSessionValid()) {
      navigate('/admin/login');
      return;
    }
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllFeedbacks();
      setFeedbacks(data);
    } catch (error: any) {
      showMessage('error', 'Failed to load feedbacks');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleOpenResponse = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setAdminResponse(feedback.admin_response || '');
    setNewStatus(feedback.status);
    setShowResponseModal(true);
  };

  const handleSaveResponse = async () => {
    if (!selectedFeedback) return;

    try {
      await adminService.updateFeedback(selectedFeedback.id, {
        status: newStatus,
        admin_response: adminResponse,
      });
      showMessage('success', 'Feedback updated successfully');
      setShowResponseModal(false);
      loadFeedbacks();
    } catch (error: any) {
      showMessage('error', 'Failed to update feedback');
    }
  };

  const handleDeleteFeedback = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;

    try {
      await adminService.deleteFeedback(id);
      showMessage('success', 'Feedback deleted successfully');
      loadFeedbacks();
    } catch (error: any) {
      showMessage('error', 'Failed to delete feedback');
    }
  };

  const getFilteredFeedbacks = () => {
    return feedbacks.filter((feedback) => {
      const matchesType = filterType === 'all' || feedback.feedback_type === filterType;
      const matchesStatus = filterStatus === 'all' || feedback.status === filterStatus;
      const matchesPriority = filterPriority === 'all' || feedback.priority === filterPriority;
      const matchesSearch =
        feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.user.username.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesType && matchesStatus && matchesPriority && matchesSearch;
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'in_progress':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'resolved':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'closed':
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default:
        return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return '🐛';
      case 'plagiarism':
        return '⚠️';
      case 'inappropriate':
        return '🚫';
      case 'feature_request':
        return '✨';
      case 'improvement':
        return '📈';
      default:
        return '💬';
    }
  };

  const filteredFeedbacks = getFilteredFeedbacks();

  return (
    <div className="min-h-screen bg-[#060410]">
      <Preloader isLoading={loading} />
      {message && <Message type={message.type} text={message.text} />}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="mb-4 text-purple-400 hover:text-purple-300 flex items-center gap-2"
          >
            <i className="fa fa-arrow-left"></i> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-50 mb-2">Feedback Management</h1>
          <p className="text-gray-400">
            Review and respond to user feedback, bug reports, and feature requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#4857605a] border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Total Feedback</div>
            <div className="text-2xl font-bold text-gray-50">{feedbacks.length}</div>
          </div>
          <div className="bg-[#4857605a] border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Open</div>
            <div className="text-2xl font-bold text-blue-400">
              {feedbacks.filter((f) => f.status === 'open').length}
            </div>
          </div>
          <div className="bg-[#4857605a] border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">In Progress</div>
            <div className="text-2xl font-bold text-purple-400">
              {feedbacks.filter((f) => f.status === 'in_progress').length}
            </div>
          </div>
          <div className="bg-[#4857605a] border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Resolved</div>
            <div className="text-2xl font-bold text-green-400">
              {feedbacks.filter((f) => f.status === 'resolved').length}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#4857605a] border border-gray-700 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-50 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by title, description, or user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1625] border border-gray-600 rounded px-3 py-2 text-gray-50 placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full bg-[#1a1625] border border-gray-600 rounded px-3 py-2 text-gray-50 focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Types</option>
                <option value="bug">Bug Report</option>
                <option value="plagiarism">Plagiarism Report</option>
                <option value="inappropriate">Inappropriate Content</option>
                <option value="feature_request">Feature Request</option>
                <option value="improvement">Improvement Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full bg-[#1a1625] border border-gray-600 rounded px-3 py-2 text-gray-50 focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Priority</label>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="w-full bg-[#1a1625] border border-gray-600 rounded px-3 py-2 text-gray-50 focus:outline-none focus:border-purple-500"
              >
                <option value="all">All Priorities</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Results</label>
              <div className="bg-[#1a1625] border border-gray-600 rounded px-3 py-2 text-gray-50">
                {filteredFeedbacks.length} / {feedbacks.length}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {filteredFeedbacks.length === 0 ? (
            <div className="bg-[#4857605a] border border-gray-700 rounded-lg p-8 text-center">
              <p className="text-gray-400">No feedback found matching your filters</p>
            </div>
          ) : (
            filteredFeedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-[#4857605a] border border-gray-700 rounded-lg p-6 hover:border-purple-500/50 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-3xl">{getTypeIcon(feedback.feedback_type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-50">{feedback.title}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(
                            feedback.status
                          )}`}
                        >
                          {feedback.status.replace('_', ' ')}
                        </span>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(
                            feedback.priority
                          )}`}
                        >
                          {feedback.priority}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{feedback.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>
                          <i className="fa fa-user mr-1"></i>
                          {feedback.user.username}
                        </span>
                        <span>
                          <i className="fa fa-calendar mr-1"></i>
                          {new Date(feedback.created_at).toLocaleDateString()}
                        </span>
                        {feedback.book_title && (
                          <span>
                            <i className="fa fa-book mr-1"></i>
                            {feedback.book_title}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenResponse(feedback)}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm transition"
                    >
                      <i className="fa fa-reply mr-1"></i> Respond
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(feedback.id)}
                      className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-300 rounded text-sm transition border border-red-500/30"
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>

                {feedback.admin_response && (
                  <div className="bg-[#1a1625] border border-purple-500/30 rounded p-4 mt-4">
                    <div className="text-sm text-purple-300 font-semibold mb-2">
                      <i className="fa fa-reply mr-2"></i> Admin Response
                    </div>
                    <p className="text-gray-300 text-sm">{feedback.admin_response}</p>
                    {feedback.resolved_at && (
                      <div className="text-xs text-gray-500 mt-2">
                        Resolved on {new Date(feedback.resolved_at).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1625] border border-gray-700 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-50">Respond to Feedback</h2>
                <button
                  onClick={() => setShowResponseModal(false)}
                  className="text-gray-400 hover:text-gray-50"
                >
                  <i className="fa fa-times text-xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Feedback Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Feedback Details</h3>
                <div className="bg-[#4857605a] border border-gray-700 rounded p-4 space-y-2">
                  <div>
                    <span className="text-gray-400 text-sm">Title:</span>
                    <p className="text-gray-50">{selectedFeedback.title}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">Description:</span>
                    <p className="text-gray-300 text-sm">{selectedFeedback.description}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm">From:</span>
                    <p className="text-gray-50">{selectedFeedback.user.username}</p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Update Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-[#4857605a] border border-gray-700 rounded px-3 py-2 text-gray-50 focus:outline-none focus:border-purple-500"
                >
                  <option value="open">Open</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Admin Response */}
              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Admin Response</label>
                <textarea
                  value={adminResponse}
                  onChange={(e) => setAdminResponse(e.target.value)}
                  placeholder="Write your response to the user..."
                  rows={6}
                  className="w-full bg-[#4857605a] border border-gray-700 rounded px-3 py-2 text-gray-50 placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">{adminResponse.length} / 1000 characters</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-700 flex gap-3 justify-end">
              <button
                onClick={() => setShowResponseModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-50 rounded transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveResponse}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition"
              >
                <i className="fa fa-save mr-2"></i> Save Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
