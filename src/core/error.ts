// src/core/error.ts

/**
 * Custom error thrown when the API returns { success: false }.
 */
export class WhoLoginAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WhoLoginAPIError';
  }
}
