declare module "@/context/AuthContext" {
  interface User {
    id: string;
    email: string;
    token: string;
    // Add any other user properties here
  }

  interface AuthContextType {
    user: User | null;
    token: string;
    login: (email: string, password: string) => Promise<User>;
    register: (formData: any) => Promise<User>; // You might want to define a more specific type for formData
    getCurrentUser: () => Promise<User>;
    logout: () => void;
  }

  const AuthContext: React.Context<AuthContextType>;

  function useAuth(): AuthContextType;

  export { AuthContext, useAuth };
}