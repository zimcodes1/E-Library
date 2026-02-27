import { getToken, updateProfile, saveAuth } from '../auth';
import API_BASE_URL from '../auth/config';


export const getBio = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/profile/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user bio');
  }
  
  return response.json();
};

export const saveBio = async (newBio: string): Promise<void> => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');
  const updatedUser = await updateProfile(token, { bio:newBio });
  
  // Update localStorage with new user data
  const currentToken = getToken();
  if (currentToken) {
    saveAuth(currentToken, updatedUser);
  }
};
