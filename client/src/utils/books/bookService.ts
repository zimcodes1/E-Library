import API_BASE_URL from '../auth/config';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Authorization': token ? `Token ${token}` : '',
    };
};

export const getBooks = async (filters?: { category?: string; search?: string; featured?: boolean }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.search) params.append('search', filters.search);
    if (filters?.featured) params.append('featured', 'true');

    const response = await fetch(`${API_BASE_URL}/books/?${params.toString()}`);
    if (!response.ok) throw new Error('Failed to fetch books');
    return response.json();
};

export const getBookDetail = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch book details');
    return response.json();
};

export const uploadBook = async (bookData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/books/`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: bookData,
    });
    if (!response.ok) throw new Error('Failed to upload book');
    return response.json();
};

export const deleteBook = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to delete book');
};

export const getUserUploadedBooks = async () => {
    const response = await fetch(`${API_BASE_URL}/my-books/`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch uploaded books');
    return response.json();
};

export const downloadBook = async (id: number, format: string = 'pdf') => {
    const response = await fetch(`${API_BASE_URL}/books/${id}/download/`, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ format }),
    });
    if (!response.ok) throw new Error('Failed to record download');
    return response.json();
};

export const getBookReviews = async (id: number) => {
    const response = await fetch(`${API_BASE_URL}/books/${id}/reviews/`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch reviews');
    return response.json();
};

export const addReview = async (bookId: number, reviewData: { rating: number; title?: string; content: string }) => {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/reviews/`, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error('Failed to add review');
    return response.json();
};

export const getUserShelves = async (type?: string) => {
    const params = type ? `?type=${type}` : '';
    const response = await fetch(`${API_BASE_URL}/shelves/${params}`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch shelves');
    return response.json();
};

export const addToShelf = async (bookId: number, shelfType: string, readingStatus?: string) => {
    const response = await fetch(`${API_BASE_URL}/shelves/`, {
        method: 'POST',
        headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book: bookId, shelf_type: shelfType, reading_status: readingStatus }),
    });
    if (!response.ok) throw new Error('Failed to add to shelf');
    return response.json();
};

export const removeFromShelf = async (shelveId: number) => {
    const response = await fetch(`${API_BASE_URL}/shelves/${shelveId}/`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to remove from shelf');
};

export const getReadingProgress = async (bookId: number) => {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/progress/`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch reading progress');
    return response.json();
};

export const updateReadingProgress = async (bookId: number, progressData: { current_page: number; total_pages: number; reading_time?: number }) => {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/progress/`, {
        method: 'PUT',
        headers: {
            ...getAuthHeaders(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
    });
    if (!response.ok) throw new Error('Failed to update reading progress');
    return response.json();
};

export const getTodayQuote = async () => {
    const response = await fetch(`${API_BASE_URL}/quote/today/`);
    if (!response.ok) throw new Error('Failed to fetch quote');
    return response.json();
};

export const getNewArrivals = async () => {
    const response = await fetch(`${API_BASE_URL}/new-arrivals/`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch new arrivals');
    return response.json();
};

export const getRecentReadings = async () => {
    const response = await fetch(`${API_BASE_URL}/recent-readings/`, {
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch recent readings');
    return response.json();
};

export const recordBookView = async (bookId: number) => {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}/view/`, {
        method: 'POST',
        headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error('Failed to record view');
    return response.json();
};
