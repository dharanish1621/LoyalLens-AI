/**
 * Centralized API Configuration & Health Detection Utility
 * Automatically detects whether Flask (port 5000) or FastAPI (port 8000) backend is active.
 */

export const DEFAULT_FLASK_URL = 'http://localhost:5000';
export const DEFAULT_FASTAPI_URL = 'http://localhost:8000';

let activeBaseUrl = DEFAULT_FLASK_URL;
let isBackendOnline = false;

export interface BackendHealthStatus {
  online: boolean;
  baseUrl: string;
  service?: string;
  error?: string;
}

/**
 * Checks backend health asynchronously with a 2-second timeout.
 * Tries port 5000 first, then falls back to port 8000.
 */
export async function checkBackendHealth(): Promise<BackendHealthStatus> {
  const tryHealthCheck = async (url: string): Promise<BackendHealthStatus | null> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch(`${url}/health`, {
        method: 'GET',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return {
          online: true,
          baseUrl: url,
          service: data.service || data.project || 'Active ML Backend',
        };
      }
    } catch (e: any) {
      // Catch connection refused, timeout, or network errors silently
    }
    return null;
  };

  // 1. Try Flask (port 5000)
  const flaskResult = await tryHealthCheck(DEFAULT_FLASK_URL);
  if (flaskResult && flaskResult.online) {
    activeBaseUrl = DEFAULT_FLASK_URL;
    isBackendOnline = true;
    return flaskResult;
  }

  // 2. Try FastAPI (port 8000)
  const fastApiResult = await tryHealthCheck(DEFAULT_FASTAPI_URL);
  if (fastApiResult && fastApiResult.online) {
    activeBaseUrl = DEFAULT_FASTAPI_URL;
    isBackendOnline = true;
    return fastApiResult;
  }

  // Backend offline
  isBackendOnline = false;
  return {
    online: false,
    baseUrl: activeBaseUrl,
    error: 'Backend server is offline. Please start the backend service.',
  };
}

export function getActiveApiBaseUrl(): string {
  return activeBaseUrl;
}

export function isBackendServiceOnline(): boolean {
  return isBackendOnline;
}
