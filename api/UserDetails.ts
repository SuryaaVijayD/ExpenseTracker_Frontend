import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const api = axios.create({
  baseURL: 'http://10.165.154.89:8080',
});

api.interceptors.request.use(async config => {
  const token = (await SecureStore.getItemAsync('userToken'))?.replace(/"/g, '');
  console.log("Retrieved token:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
