/** Generic API success response wrapper */
export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/** Generic API error response */
export interface ApiErrorResponse {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  details?: Record<string, string[]>;
}
