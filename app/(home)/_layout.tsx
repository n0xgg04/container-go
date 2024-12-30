import { Tabs } from 'expo-router';
import React, { useCallback } from 'react';
import DashboardIcon from '@/assets/images/svg/DashboardIcon';
import NotificationIcon from '@/assets/images/svg/NotificationIcon';
import AccountIcon from '@/assets/images/svg/AccountIcon';
import ContainerIcon from '@/assets/images/svg/ContainerIcon';
import { useTheme } from '@/shared/hooks';
import DashboardActiveIcon from '@/assets/images/svg/DashboardActive';
import ContainerActive from '@/assets/images/svg/ContainerActive';
import AccountActiveIcon from '@/assets/images/svg/AccountActive';
import NotificationActiveIcon from '@/assets/images/svg/NotificationActiveIcon';
import { Fonts } from '@/shared/constants/themes';
import { Box } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform, Pressable } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import Guard from '@/shared/guards/Guard';

export default function TabLayout() {
  const { colors } = useTheme();
  const safeAreas = useSafeAreaInsets();

  const withColor = useCallback(
    (Inactive: IconComponent, Active: IconComponent) => {
      return ({ focused }: { focused: boolean }) => {
        if (focused) {
          return <Active />;
        } else {
          return <Inactive />;
        }
      };
    },
    []
  );

  const tabBarButton = React.useCallback(
    ({
      children,
      accessibilityState,
      style,
      ...props
    }: BottomTabBarButtonProps) => {
      return (
        <Pressable
          style={[
            style,
            {
              position: 'relative',
              backgroundColor: accessibilityState?.selected
                ? colors.primary
                : undefined,
              borderRadius: Spacing.SPACING_10,
            },
          ]}
          {...props}
        >
          <Box
            style={{
              backgroundColor: '#fff',
              width: '100%',
              position: 'absolute',
              top: Spacing.SPACING_3,
              left: 0,
              right: 0,
              height: '100%',
              borderRadius: Spacing.SPACING_8,
            }}
          >
            {children}
          </Box>
        </Pressable>
      );
    },
    [colors.primary]
  );

  const sharedTabBarOptions = React.useMemo(() => {
    return {
      tabBarLabelStyle: {
        fontFamily: Fonts.Bold,
      },
      tabBarStyle: {
        paddingVertical: Spacing.SPACING_6,
        paddingHorizontal: Spacing.SPACING_6,
        paddingBottom: Platform.select({
          ios: safeAreas.bottom,
          android: Spacing.SPACING_15,
        }),
        height: Platform.select({
          ios: Spacing.SPACING_50 + safeAreas.bottom,
          android: Spacing.SPACING_65,
        }),
      },
      tabBarButton: tabBarButton,
    };
  }, [tabBarButton]);

  return (
    <Guard redirectTo="/sign-in">
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: Spacing.SPACING_63 + safeAreas.bottom,
            paddingBottom: Platform.select({
              ios: undefined,
              android: Spacing.SPACING_24,
            }),
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Dashboard',
            tabBarIcon: withColor(DashboardIcon, DashboardActiveIcon),
            ...sharedTabBarOptions,
          }}
        />
        <Tabs.Screen
          name="container"
          options={{
            title: 'Containers',
            tabBarIcon: withColor(ContainerIcon, ContainerActive),
            ...sharedTabBarOptions,
            lazy: true,
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Tài khoản',
            tabBarIcon: withColor(AccountIcon, AccountActiveIcon),
            ...sharedTabBarOptions,
            lazy: true,
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Thông báo',
            tabBarIcon: withColor(NotificationIcon, NotificationActiveIcon),
            ...sharedTabBarOptions,
            lazy: true,
          }}
        />
      </Tabs>
    </Guard>
  );
}
