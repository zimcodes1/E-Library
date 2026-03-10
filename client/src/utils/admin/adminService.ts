import API_BASE_URL from '../auth/config';

const getAuthToken = () => localStorage.getItem('token');

export const adminService = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    return response.json();
  },

  getActivities: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/activities/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    return response.json();
  },

  getPendingBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/pending-books/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    return response.json();
  },

  getAllBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/books/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    return response.json();
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    return response.json();
  },

  approveBook: async (bookId: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/books/${bookId}/approve/`, {
      method: 'POST',
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    return response.json();
  },

  rejectBook: async (bookId: number, reason: string) => {
    const response = await fetch(`${API_BASE_URL}/admin/books/${bookId}/reject/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ reason })
    });
    return response.json();
  }
};
