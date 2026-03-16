import API_BASE_URL from '../auth/config';

export interface FeedbackData {
  feedback_type: string;
  title: string;
  description: string;
  book?: number | null;
  priority?: string;
}

export interface Feedback {
  id: number;
  feedback_type: string;
  title: string;
  description: string;
  book?: number | null;
  book_title?: string;
  status: string;
  priority: string;
  created_at: string;
  updated_at: string;
  resolved_at?: string;
  admin_response?: string;
  user: {
    id: number;
    username: string;
    avatar_url: string;
  };
}

export const submitFeedback = async (token: string, data: FeedbackData): Promise<Feedback> => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to submit feedback');
  }

  return response.json();
};

export const getUserFeedbacks = async (token: string): Promise<Feedback[]> => {
  const response = await fetch(`${API_BASE_URL}/api/feedbacks/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch feedbacks');
  }

  return response.json();
};
