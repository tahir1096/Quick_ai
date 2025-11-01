import { useAuth } from '@clerk/clerk-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useApi = () => {
  const { getToken } = useAuth();

  const apiCall = async (endpoint, options = {}) => {
    try {
      let token = null;
      try {
        token = await getToken();
      } catch (tokenErr) {
        console.warn('Token retrieval failed, proceeding without auth:', tokenErr.message);
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...options,
      };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `API error: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  return { apiCall };
};

export const apiEndpoints = {
  generateArticle: '/api/ai/generate-article',
  generateBlogTitles: '/api/ai/generate-blog-titles',
  generateImages: '/api/ai/generate-images',
  removeBackground: '/api/ai/remove-background',
  removeObject: '/api/ai/remove-object',
  reviewResume: '/api/ai/review-resume',
};
