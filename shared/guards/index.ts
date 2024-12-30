import { Login } from '@/shared/features/auth/login';
import { ForgotPassword } from '../features/auth/forgot-password';
import { PhoneLogin } from '../features/auth/phone-login';
import { getUserinfo } from '@/shared/features/auth/get-userinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '@/shared/constants/async-storage-key';
import { GuardI } from './GuardLogic';

export class Guard implements GuardI {
  async checkSessionIsValid(access_token: string) {
    return {
      isValid: true,
      data: {},
      expire_at: '',
    };
  }

  async login(payload: $LoginPayload) {
    const login = await Login(payload);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USER, payload.username);
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.GUARD, login.data.idToken);
    try {
      const data = await getUserinfo();
      return {
        isLoggedIn: true,
        data: data.data,
        expire_at: '',
        access_token: login.data.idToken,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return {
        isLoggedIn: true,
        data: {},
        expire_at: '',
        access_token: login.data.idToken,
      };
    }
  }

  async forgotPassword(payload: $ForgotPasswordPayload) {
    const forgotPassword = await ForgotPassword(payload);
    return {
      success: forgotPassword,
    };
  }

  async phoneLogin(payload: $PhoneLoginPayload) {
    const phoneLogin = await PhoneLogin(payload);
    return {
      success: phoneLogin,
    };
  }

  async refreshToken() {
    return {
      isLoggedIn: true,
      data: {},
      expire_at: '',
      access_token: '',
    };
  }

  logout(): Promise<boolean> {
    return Promise.resolve(false);
  }
}
