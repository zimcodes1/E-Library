import API_BASE_URL from './auth/config';

export const getCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories/`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};
