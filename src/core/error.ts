export class WhoLoginAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WhoLoginAPIError';
  }
}
