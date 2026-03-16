import API_BASE_URL from '../auth/config';

export interface PublicStats {
  total_books: number;
  total_users: number;
  total_downloads: number;
  average_rating: number;
}

export const getPublicStats = async (): Promise<PublicStats> => {
  const response = await fetch(`${API_BASE_URL}/stats/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }
  
  return response.json();
};