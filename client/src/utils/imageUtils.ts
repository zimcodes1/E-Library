import API_BASE_URL from './auth/config';

export const getAvatarUrl = (avatarPath: string | null | undefined): string => {
  if (!avatarPath) return '/images/defaultUser.jpg';
  if (avatarPath.startsWith('http')) return avatarPath;
  if (avatarPath.startsWith('/media/')) {
    return `${API_BASE_URL.replace('/api', '')}${avatarPath}`;
  }
  return `${API_BASE_URL.replace('/api', '')}/media/${avatarPath}`;
};

export const getBookCoverUrl = (coverPath: string | null | undefined): string => {
  if (!coverPath) return '/images/default-book-cover.jpg';
  if (coverPath.startsWith('http')) return coverPath;
  if (coverPath.startsWith('/media/')) {
    return `${API_BASE_URL.replace('/api', '')}${coverPath}`;
  }
  return `${API_BASE_URL.replace('/api', '')}/media/${coverPath}`;
};
