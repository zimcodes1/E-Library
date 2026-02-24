import { getToken, updateProfile, saveAuth } from './auth';
import API_BASE_URL from './auth/config';

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await fetch(`${API_BASE_URL}/categories/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  return response.json();
};

export const saveUserInterests = async (interestNames: string[]): Promise<void> => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const categories = await getCategories();
  const interestIds = categories
    .filter(cat => interestNames.includes(cat.name))
    .map(cat => cat.id);

  const updatedUser = await updateProfile(token, { interest_ids: interestIds });
  
  // Update localStorage with new user data
  const currentToken = getToken();
  if (currentToken) {
    saveAuth(currentToken, updatedUser);
  }
};
