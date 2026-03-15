import API_BASE_URL from './config';

export interface SignupData {
  username: string;
  email: string;
  password: string;
  avatar?: File;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    avatar?: string;
    avatar_url?: string;
    bio?: string;
    reading_hours: number;
    books_read: number;
    interests?: Array<{id: number; name: string; slug: string}>;
    is_staff?: boolean;
  };
}

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append('username', data.username);
  formData.append('email', data.email);
  formData.append('password', data.password);
  if (data.avatar) {
    formData.append('avatar', data.avatar);
  }

  const response = await fetch(`${API_BASE_URL}/auth/signup/`, {
    method: 'POST',
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    if (result.username) {
      throw new Error(result.username[0]);
    }
    if (result.email) {
      throw new Error(result.email[0]);
    }
    if (result.password) {
      throw new Error(result.password[0]);
    }
    throw new Error('Signup failed. Please try again.');
  }

  return result;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Invalid credentials');
  }

  return result;
};

export const logout = async (token: string): Promise<void> => {
  await fetch(`${API_BASE_URL}/auth/logout/`, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getProfile = async (token: string): Promise<AuthResponse['user']> => {
  const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return response.json();
};

export const updateProfile = async (token: string, data: Partial<AuthResponse['user']> & {interest_ids?: number[]}): Promise<AuthResponse['user']> => {
  const response = await fetch(`${API_BASE_URL}/auth/profile/`, {
    method: 'PUT',
    headers: {
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to update profile');
  }

  const user = await response.json();
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};

export const saveAuth = (token: string, user: AuthResponse['user']): void => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const getUser = (): AuthResponse['user'] | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const clearAuth = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
