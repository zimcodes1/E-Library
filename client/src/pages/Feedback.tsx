import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../components/SideMenu';
import Tabs from '../components/ui/Tabs';
import Message from '../components/ui/Message';
import Preloader from '../components/ui/Preloader';
import FeedbackForm from '../components/feedback/FeedbackForm';
import FeedbackList from '../components/feedback/FeedbackList';
import { getToken, isAuthenticated } from '../utils/auth';
import { submitFeedback, getUserFeedbacks, type Feedback } from '../utils/feedback/feedbackService';
import { getUserUploadedBooks } from '../utils/books';

const FeedbackPage = () => {
  useEffect(() => {
    document.title = 'Feedback | Libronet';
  }, []);

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: string; text: string } | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [books, setBooks] = useState<Array<{ id: number; title: string }>>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    loadFeedbacks();
    loadBooks();
  }, []);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error('Not authenticated');
      const data = await getUserFeedbacks(token);
      setFeedbacks(data);
    } catch (error: any) {
      console.error('Failed to load feedbacks:', error);
      showMessage('error', 'Failed to load feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const data = await getUserUploadedBooks();
      setBooks(data.map((b: any) => ({ id: b.id, title: b.title })));
    } catch (error) {
      console.error('Failed to load books:', error);
    }
  };

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSubmitFeedback = async (data: any) => {
    setLoading(true);
    try {
      const token = getToken();
      if (!token) throw new Error('Not authenticated');
      await submitFeedback(token, data);
      showMessage('success', 'Feedback submitted successfully!');
      setActiveTab(1);
      loadFeedbacks();
    } catch (error: any) {
      showMessage('error', error.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-end max-sm:items-start items-center bg-[#060410] sm:bgImage min-h-screen max-sm:h-fit pb-10">
      <Preloader isLoading={loading} />
      {message && <Message type={message.type} text={message.text} />}
      <SideMenu />
      <div className="w-6/7 max-sm:w-full min-h-dvh max-sm:h-fit flex flex-col px-10 max-sm:p-3 pt-5 pb-20 max-sm:pb-28 relative">
        <div className="w-full h-full flex items-center justify-start flex-col">
          <div className="w-full max-w-5xl max-h-fit max-[900px]:h-fit rounded-2xl bg-[#4857605a] p-8 max-sm:p-4 border border-gray-700 flex flex-col">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-50 mb-2">Feedback & Reports</h1>
              <p className="text-gray-400">
                Help us improve Libronet by sharing your feedback, reporting issues, or suggesting features.
              </p>
            </div>

            <div className="mt-6 flex-1 flex flex-col">
              <Tabs
                tabs={['Submit Feedback', 'Your Feedback']}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              {activeTab === 0 && (
                <div className="mt-6 max-w-2xl">
                  <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <p className="text-purple-300 text-sm">
                      <i className="fa fa-info-circle mr-2"></i>
                      Your feedback helps us create a better experience for everyone. Please be as detailed as possible.
                    </p>
                  </div>
                  <FeedbackForm
                    onSubmit={handleSubmitFeedback}
                    loading={loading}
                    books={books}
                  />
                </div>
              )}

              {activeTab === 1 && (
                <div className="mt-6">
                  <FeedbackList
                    feedbacks={feedbacks}
                    loading={loading}
                    emptyMessage="You haven't submitted any feedback yet. Start by sharing your thoughts!"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
