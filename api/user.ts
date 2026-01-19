import * as SecureStore from 'expo-secure-store';

const BASE_URL = 'https://expensetracker-backend-5dac.onrender.com';

export type User = {
  username: string;
  email: string;
  phoneNumber: string;
  salary: number;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const token = await SecureStore.getItemAsync('userToken');

  if (!token) {
    throw new Error('No token found');
  }

  const res = await fetch(`${BASE_URL}/user/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Unauthorized');
  }

  return res.json();
};
