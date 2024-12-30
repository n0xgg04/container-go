import { Stack } from 'expo-router';
import React from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { TanStackQueryProvider, AppThemeProvider } from '@/shared/provider';
import { useLoadingPackages } from '@/shared/hooks';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { withRecoilRoot } from '@/shared/hocs/recoil';
import '@expo/metro-runtime';
import { ApplicationProvider } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Loading from '@/shared/components/common/Loading';
import { Toasts } from '@backpackapp-io/react-native-toast';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DebuggerProvider from '@/shared/provider/DebuggerProvider';
import { default as mapping } from '../mapping.json';

const RootLayout = withRecoilRoot(function () {
  const { isLoading } = useLoadingPackages();

  if (isLoading) return null;

  return (
    <GestureHandlerRootView className="flex-1">
      <TanStackQueryProvider>
        <AppThemeProvider>
          <BottomSheetModalProvider>
            <DebuggerProvider>
              <Loading />
              <Toasts />
              <ApplicationProvider
                {...eva}
                theme={eva.light}
                customMapping={mapping as any}
              >
                <Stack
                  screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                  }}
                >
                  <Stack.Screen name="(home)" />
                </Stack>
              </ApplicationProvider>
            </DebuggerProvider>
          </BottomSheetModalProvider>
        </AppThemeProvider>
      </TanStackQueryProvider>
    </GestureHandlerRootView>
  );
});

export default RootLayout;
