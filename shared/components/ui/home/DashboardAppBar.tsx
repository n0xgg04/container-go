import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import { Pressable, StyleSheet, Image, Platform, Alert } from 'react-native';
import LogOutIcon from '@/assets/images/svg/LogOutIcon';
import FontSize from '@/shared/constants/font-scale';
import { useRouter } from 'expo-router';
import { useUserData } from '@/states/recoil/atoms/AuthenticationAtom';
import useAuth from '@/shared/services/mutations/auth/useAuth';
import FilterIconWhite from '@/assets/images/svg/FilterIconWhite';
import { IMAGES } from '@/shared/constants/assets';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';

interface PropsDashboardAppBar {
  isFilter?: boolean;
}

const DashboardAppBar = React.memo(({ isFilter }: PropsDashboardAppBar) => {
  const router = useRouter();
  const data = useUserData();
  const { logout } = useAuth();
  const [, setOverlayState] = useAppOverlayState();

  const handleLogout = React.useCallback(() => {
    Alert.alert('Đăng xuất', 'Bạn có chắc chắn muốn đăng xuất?', [
      {
        text: 'Huỷ bỏ',
        onPress: () => {},
      },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: () => {
          setOverlayState((pre) => ({ ...pre, isLoading: true }));

          logout().then((r) => {
            setOverlayState((pre) => ({ ...pre, isLoading: false }));
            router.replace('/sign-in');
          });
        },
      },
    ]);
  }, [logout, router, setOverlayState]);

  const handleFilter = React.useCallback(() => {
    router.push('/(pick-up)/filter-container');
  }, [router]);

  const handleGoAccount = React.useCallback(() => {
    router.push('/account');
  }, [router]);

  return (
    <Stack
      style={[styles.container]}
      direction="row"
      className="items-center justify-between"
    >
      <Stack gap={Spacing.SPACING_8} className="items-center">
        <Pressable onPress={handleGoAccount}>
          <Image style={styles.avatar} source={IMAGES.LOGIN.AVATAR} />
        </Pressable>
        <Typography fontSize={FontSize.FONT_SIZE_16} weight="bold">
          {data?.name}
        </Typography>
      </Stack>
      {isFilter && (
        <Pressable onPress={handleFilter}>
          <FilterIconWhite style={styles.logoutIcon} />
        </Pressable>
      )}
      {!isFilter && (
        <Pressable onPress={handleLogout}>
          <LogOutIcon style={styles.logoutIcon} />
        </Pressable>
      )}
    </Stack>
  );
});

export default DashboardAppBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.SPACING_17,
    paddingTop: Platform.select({
      ios: Spacing.SPACING_10,
      android: Spacing.SPACING_20,
    }),
  },
  logoutIcon: {
    width: Spacing.SPACING_24,
    height: Spacing.SPACING_24,
  },
  avatar: {
    height: Spacing.SPACING_36,
    width: Spacing.SPACING_36,
    borderRadius: 999,
    objectFit: 'fill',
  },
});
