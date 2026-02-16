import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchCurrentUser, User } from '../api/user'; // Adjust path to where your API file is

// 1. Update the Context Type to include setUser
type AuthContextType = {
  token: string | null;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // <--- ADD THIS
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
      // Optional: Don't nullify user on simple fetch error to keep UI visible
      // setUser(null); 
    }
  };

  useEffect(() => {
    const loadAuth = async () => {
      const storedToken = await SecureStore.getItemAsync('userToken');
      setToken(storedToken);

      if (storedToken) {
        // Try to fetch latest data on app launch
        try {
          const userData = await fetchCurrentUser();
          setUser(userData);
        } catch (e) {
          console.log("Could not refresh user on load");
        }
      }

      setIsLoading(false);
    };

    loadAuth();
  }, []);

  const login = async (newToken: string) => {
    await SecureStore.setItemAsync('userToken', newToken);
    setToken(newToken);
    
    // Fetch user details immediately after login
    const userData = await fetchCurrentUser();
    setUser(userData);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ 
        token, 
        user, 
        setUser, // <--- PASS IT HERE so the rest of the app can use it
        isLoading, 
        login, 
        logout, 
        refreshUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);