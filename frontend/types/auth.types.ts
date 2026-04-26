export type AuthProvider = "GOOGLE" | "GITHUB" | "LOCAL"

export interface User {
  id: string
  email: string
  name: string | null
  avatarUrl: string | null
  provider: AuthProvider | null
  createdAt: string
  updatedAt: string
}

export interface AuthResponse {
  user: User
  accessToken: string
}

// form input types
export interface LoginInput {
  email: string
  password: string
}

export interface RegisterInput {
  email: string
  password: string
  name?: string
}

export interface UpdateUserInput {
  name?: string
  email?: string
}
