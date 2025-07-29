import { dispatchAuthEvent, AUTH_EVENTS } from './events';

export const apiCall = async (url, options = {}) => {
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include', // gửi cookie httpOnly lên server
  };

  const response = await fetch(url, config);

  if (response.status === 401) {
    // Xóa local state nếu có
    dispatchAuthEvent(AUTH_EVENTS.LOGOUT);
    if (typeof window !== 'undefined') {
      window.location.href = '/signin';
    }
    return null;
  }

  return response;
};

export const signUp = async (userData) => {
  try {
    const response = await fetch('/api/public/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
      credentials: 'include',
    });

    const data = await response.json();

    if (response.ok) {
      dispatchAuthEvent(AUTH_EVENTS.LOGIN);
      return { success: true, data };
    } else {
      return { success: false, error: data.error || data.message || 'Unknown error' };
    }
  } catch (error) {
    console.error('SignUp error:', error);
    return { success: false, error: error.message || 'Network error' };
  }
};


export const signIn = async ({ email, password }) => {
  try {
    const response = await fetch('/api/public/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await response.json();
    if (response.ok) {
      dispatchAuthEvent(AUTH_EVENTS.LOGIN);
      return { success: true, user: data.user };
    } else {
      return { success: false, error: data.error || 'Login failed' };
    }
  } catch (error) {
    return { success: false, error: 'Network error' };
  }
};

export const signOut = async () => {
  try {
    await fetch('/api/user/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    // không cần xử lý lỗi
  }

  dispatchAuthEvent(AUTH_EVENTS.LOGOUT);
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
};
