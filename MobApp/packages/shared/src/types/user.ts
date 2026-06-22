/** Publicly exposed User shape (never includes password) */
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

/** POST /api/auth/register — request body */
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

/** POST /api/auth/login — request body */
export interface LoginRequest {
  email: string;
  password: string;
}

/** Auth endpoints — response payload */
export interface AuthResponse {
  user: User;
  token: string;
}
