// API configuration
export const API_BASE_URL = 'http://64.226.124.118:8080';

export const API_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  defaultOptions: {
    mode: 'cors' as const,
    credentials: 'omit' as const, // Changed from 'include' since we don't need credentials
  },
} as const;