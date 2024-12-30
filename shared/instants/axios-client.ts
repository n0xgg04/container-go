import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '@/shared/constants/async-storage-key';

const axiosClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    'x-user-type': 'CARRIER',
  },
  timeout: Number(process.env.EXPO_PUBLIC_REQUEST_TIMEOUT || 10000),
});

axiosClient.interceptors.request.use(async function (request) {
  const token = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.GUARD);
  if (token) {
    request.headers.Authorization = 'Bearer ' + token;
  }
  return request;
});

export { axiosClient };
