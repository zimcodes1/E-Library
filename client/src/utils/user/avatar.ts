import { getToken, saveAuth } from '../auth';
import API_BASE_URL from '../auth/config';

export const updateAvatar = async (file: File): Promise<string> => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const formData = new FormData();
  formData.append('avatar', file);

  const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update avatar');
  }

  const updatedUser = await response.json();
  
  // Update localStorage with new user data
  if (token) {
    saveAuth(token, updatedUser);
  }

  return updatedUser.avatar;
};
