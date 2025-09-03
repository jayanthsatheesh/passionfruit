import { User } from '@/types';

const AUTH_KEY = 'passionfruit_auth';
const USER_KEY = 'passionfruit_user';
const USERS_KEY = 'passionfruit_users';

export const authService = {
  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_KEY);
  },

  getCurrentUser(): User | null {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  getAuthState() {
    return {
      user: this.getCurrentUser(),
      isAuthenticated: this.isAuthenticated()
    };
  },

  signIn(email: string, password: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          localStorage.setItem(AUTH_KEY, 'true');
          localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  signUp(email: string, password: string, name: string, phone?: string, pincode?: string): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
        
        if (users.find((u: any) => u.email === email)) {
          reject(new Error('User already exists with this email'));
          return;
        }

        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          phone,
          pincode,
          bookings: []
        };

        users.push({ ...newUser, password });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        localStorage.setItem(AUTH_KEY, 'true');
        localStorage.setItem(USER_KEY, JSON.stringify(newUser));
        
        resolve(newUser);
      }, 1000);
    });
  },

  signOut(): void {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  },

  updateProfile(userData: Partial<User>): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData };
          localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
          
          // Update in users list as well
          const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
          const userIndex = users.findIndex((u: any) => u.id === currentUser.id);
          if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...userData };
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
          }
          
          resolve(updatedUser);
        }
      }, 500);
    });
  }
};
