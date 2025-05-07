const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse {
  message?: string;
  error?: string;
  [key: string]: any;
}

export const register = async (name: string, email: string, password: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
    credentials: 'include',
  });
  return response.json();
};

export const login = async (email: string, password: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });
  return response.json();
};

export const logout = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/api/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  return response.json();
};

export const getUser = async (): Promise<ApiResponse> => {
  const response = await fetch(`${API_URL}/api/user`, {
    method: 'GET',
    credentials: 'include',
  });
  return response.json();
};