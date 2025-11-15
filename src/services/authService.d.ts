interface UserData {
  username: string;
  email: string;
  name: string;
  token: string;
}

declare const authService: {
  register: (userData: any) => Promise<any>;
  login: (email: string, password: string) => Promise<UserData>;
};

export default authService;