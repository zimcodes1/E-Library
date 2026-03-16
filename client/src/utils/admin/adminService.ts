import API_BASE_URL from '../auth/config';

const getAuthToken = () => localStorage.getItem('token');

export const adminService = {
  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats/detailed/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to fetch stats');
    return response.json();
  },

  getActivities: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/activities/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to fetch activities');
    return response.json();
  },

  getPendingBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/pending-books/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to fetch pending books');
    return response.json();
  },

  getAllBooks: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/books/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to fetch books');
    return response.json();
  },

  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/users/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  approveBook: async (bookId: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/books/${bookId}/approve/`, {
      method: 'POST',
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to approve book');
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
    if (!response.ok) throw new Error('Failed to reject book');
    return response.json();
  },

  getUserActivityData: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/activities/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to fetch activity data');
    const activities = await response.json();
    
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const data = new Array(7).fill(0);
    
    activities.forEach((activity: any) => {
      const date = new Date(activity.timestamp);
      const dayIndex = date.getDay();
      data[dayIndex === 0 ? 6 : dayIndex - 1]++;
    });
    
    return { labels: days, data };
  },

  getCategoryDistribution: async () => {
    const response = await fetch(`${API_BASE_URL}/admin/books/`, {
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to fetch category data');
    const books = await response.json();
    
    const categoryCount: { [key: string]: number } = {};
    books.forEach((book: any) => {
      const category = book.category?.name || 'Other';
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });
    
    const labels = Object.keys(categoryCount);
    const data = Object.values(categoryCount);
    
    return { labels, data };
  },

  deleteUser: async (userId: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },

  updateUser: async (userId: number, data: { role?: string; isActive?: boolean }) => {
    const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${getAuthToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update user');
    return response.json();
  },

  deleteBook: async (bookId: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/books/${bookId}/delete/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to delete book');
    return response.json();
  },

  toggleBookVisibility: async (bookId: number) => {
    const response = await fetch(`${API_BASE_URL}/admin/books/${bookId}/toggle-visibility/`, {
      method: 'PATCH',
      headers: { 'Authorization': `Token ${getAuthToken()}` }
    });
    if (!response.ok) throw new Error('Failed to toggle book visibility');
    return response.json();
  }
};
