export interface User {
  id: string;
  email: string;
  token: string;
}

export interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => void;
  register: (formData: { username: string; email: string; password: string }) => void;
  logout: () => void;
  getUser: () => User | null;
}