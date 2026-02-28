import API_BASE_URL from './auth/config';

export const getAvatarUrl = (avatarPath: string | null | undefined): string => {
  if (!avatarPath) return '/images/defaultUser.jpg';
  
  // If it's already a full URL, return it
  if (avatarPath.startsWith('http')) return avatarPath;
  
  // If it starts with /media/, prepend the API base URL
  if (avatarPath.startsWith('/media/')) {
    return `${API_BASE_URL.replace('/api', '')}${avatarPath}`;
  }
  
  // Otherwise, assume it's just the filename
  return `${API_BASE_URL.replace('/api', '')}/media/${avatarPath}`;
};
