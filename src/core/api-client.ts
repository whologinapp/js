import type { ApiResponse } from '../types/internal';
import { WhoLoginAPIError } from './error';

/**
 * Base HTTP client for WhoLogin API.
 */
export class BaseAPIClient {
  protected readonly apiUrl: string;
  protected readonly apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    this.apiKey = apiKey;
  }

  /**
   * Perform an HTTP request against the WhoLogin API.
   *
   * - Automatically prefixes the base URL
   * - Sends Bearer token and JSON content-type headers
   * - Parses JSON responses following ApiResponse<T> shape
   * - Throws WhoLoginAPIError when success=false
   *
   * @param endpoint API path starting with '/'
   * @param method HTTP method
   * @param body Optional JSON-serializable payload
   */
  protected async _request<T>(
    endpoint: string,
    method: 'GET' | 'POST',
    body?: unknown
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
    const options: RequestInit = {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    };

    const response = await fetch(url, options).catch((networkError) => {
      throw new Error(`Network request failed: ${networkError.message}`);
    });

    if (!response.headers.get('content-type')?.includes('application/json')) {
      if (response.ok) return undefined as T;
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const apiResponse: ApiResponse<T> = await response.json();

    if (apiResponse.success) {
      return (apiResponse as { data?: T }).data as T;
    } else {
      throw new WhoLoginAPIError(apiResponse.errorMessage);
    }
  }
}
