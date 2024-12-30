import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import { useLoadFontFamily } from '@/shared/hooks/useLoadFontFamily';
import useGuardLoader from '@/shared/guards/GuardLoader';

(async () => SplashScreen.preventAutoHideAsync())();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function useLoadingPackages() {
  const { isLoading } = useLoadFontFamily();
  useGuardLoader();

  React.useEffect(() => {
    if (!isLoading) (async () => SplashScreen.hideAsync())();
  }, [isLoading]);

  return { isLoading };
}
