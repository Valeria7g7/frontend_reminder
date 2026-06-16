import axios from 'axios';
import { APP_CONFIG } from '../config/appConfig';
import { sessionStore } from '../store/sessionStore';
import LoginResource from '@/modules/login/resources/LoginResources'
export class ApiError extends Error {
  status?: number;
  payload?: unknown;

  constructor(message: string, status?: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

export const apiClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 10000
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStore.getState().token?.access_token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    try {
      const status = error.response?.status;
      const originalRequest = error.config;
      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const newAccessToken = await LoginResource.refresh()
        sessionStore.setState({ token: { access_token: newAccessToken } });
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest)
      }
      if (status === 403 && (originalRequest._retry = true)) {
        sessionStore.getState().logout();

        if (window.location.pathname !== '/login') {
          window.location.href = '/login';
        }


      }

      const message =
        error.response?.data?.message || error.message || 'Unexpected error, please try again';
      return Promise.reject(new ApiError(message, status, error.response?.data));

    } catch (refreshError) {
      sessionStore.getState().logout();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      return Promise.reject(refreshError);
    }
  }
);
