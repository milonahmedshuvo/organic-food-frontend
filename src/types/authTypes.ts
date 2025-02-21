export interface User {
    email: string;
    role: 'customer' | 'admin'
  }
  
export interface AuthState {
    user: User | null
  }