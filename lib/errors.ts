/**
 * Custom error classes for better error handling
 */

export class TokenFetchError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "TokenFetchError";
  }
}

export class WebSocketError extends Error {
  constructor(message: string, public code?: number) {
    super(message);
    this.name = "WebSocketError";
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = "ValidationError";
  }
}

