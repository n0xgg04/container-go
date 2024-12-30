import { DefaultTheme } from '@react-navigation/native';

declare global {
  type NetworkDevToolItem = {
    url?: string;
    method?: string;
    statusCode?: number;
    payload?: object;
    response?: object;
  };

  type PICK_STATUS = 'DONE' | 'FAILED' | 'WAITING';

  type NetworkDevTool = NetworkDevToolItem[];

  type DefaultThemeT = typeof DefaultTheme;
  type AppThemeT = {} & DefaultThemeT;

  type UserData = {
    username: string;
    email: string;
  };
}

declare module '@react-navigation/native' {
  export function useTheme(): AppThemeT;
}

export {};
