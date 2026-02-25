import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import { AuthState, User } from '../types';

// Default admin user (in production, this should be in a secure backend)
const DEFAULT_ADMIN: User = {
  id: '1',
  username: 'admin',
  passwordHash: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
  role: 'admin'
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedAuth = localStorage.getItem('portfolio-auth');
    if (storedAuth) {
      try {
        const parsed = JSON.parse(storedAuth);
        if (parsed.expiresAt > Date.now()) {
          setAuthState({
            isAuthenticated: true,
            user: parsed.user
          });
        } else {
          localStorage.removeItem('portfolio-auth');
        }
      } catch (error) {
        localStorage.removeItem('portfolio-auth');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // In production, this would be an API call
      if (username === DEFAULT_ADMIN.username) {
        const isValid = await bcrypt.compare(password, DEFAULT_ADMIN.passwordHash);
        if (isValid) {
          const authData = {
            user: DEFAULT_ADMIN,
            expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
          };
          localStorage.setItem('portfolio-auth', JSON.stringify(authData));
          setAuthState({
            isAuthenticated: true,
            user: DEFAULT_ADMIN
          });
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('portfolio-auth');
    setAuthState({
      isAuthenticated: false,
      user: null
    });
  };

  return {
    ...authState,
    isLoading,
    login,
    logout
  };
};