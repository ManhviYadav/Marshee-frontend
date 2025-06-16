// Frontend authentication utilities
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://marshee-back.onrender.com';

// Token management
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    const expiryTime = Date.now() + (2 * 60 * 1000); // 2 minutes from now
    localStorage.setItem('authToken', token);
    localStorage.setItem('tokenExpiry', expiryTime.toString());
    
    // Set automatic token cleanup after 2 minutes
    setTimeout(() => {
      removeToken();
      console.log('🕐 Token expired after 2 minutes - user logged out');
      if (window.location.pathname === '/store') {
        window.location.href = '/signup-login';
      }
    }, 2 * 60 * 1000);
  }
};

export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('tokenExpiry');
  }
};

export const getUser = () => {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

export const setUser = (user) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

// API call helper
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const url = `${API_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    // Handle token expiration
    if (response.status === 401) {
      removeToken();
      window.location.href = '/signup-login';
      return null;
    }

    return { success: response.ok, data, status: response.status };
  } catch (error) {
    console.error('API call failed:', error);
    return { success: false, error: error.message };
  }
};

// Authentication functions
export const registerUser = async (userData) => {
  const result = await apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });

  if (result.success && result.data.token) {
    setToken(result.data.token);
    setUser(result.data.user);
  }

  return result;
};

export const loginUser = async (credentials) => {
  const result = await apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  if (result.success && result.data.token) {
    setToken(result.data.token);
    setUser(result.data.user);
  }

  return result;
};

export const logoutUser = async () => {
  await apiCall('/api/auth/logout', { method: 'POST' });
  removeToken();
  window.location.href = '/';
};

export const getCurrentUser = async () => {
  return await apiCall('/api/auth/me');
};

// Check if user is authenticated and token hasn't expired
export const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  const tokenExpiry = localStorage.getItem('tokenExpiry');
  
  if (!token || !user || !tokenExpiry) {
    return false;
  }
  
  // Check if token has expired (client-side check)
  if (Date.now() > parseInt(tokenExpiry)) {
    console.log('🕐 Token expired (client-side check) - removing token');
    removeToken();
    return false;
  }
  
  return true;
};

// Protected route helper
export const requireAuth = (router) => {
  if (!isAuthenticated()) {
    router.push('/signup-login');
    return false;
  }
  return true;
};

// API calls for protected routes
export const fetchShopItems = async () => {
  return await apiCall('/api/shop');
};

// API calls for public routes
export const fetchCommunityPosts = async () => {
  return await apiCall('/api/community');
};

export const fetchPetCareTips = async () => {
  return await apiCall('/api/community/tips');
}; 