import { fetchCurrentUser } from '../api/user';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

export type User = {
  username: string;
  email: string;
  phoneNumber: string;
  salary: number;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (err) {
      console.log('Failed to fetch user', err);
      setUser(null);
    }
  };

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      setToken(storedToken);

      if (storedToken) {
        await refreshUser();
      }

      setIsLoading(false);
    };

    loadAuth();
  }, []);

  const login = async (newToken: string) => {
    await SecureStore.setItemAsync('userToken', newToken);
    setToken(newToken);
    await refreshUser();
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isLoading, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
