import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/shared/hooks';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import usePickLocationState, {
  useSetPickLocationFn,
} from '@/states/hooks/usePickLocationState';
import useCheckIn from '@/shared/services/mutations/pick/useCheckIn';
import { PICK_STEP } from '@/states/recoil/atoms/PickLocationAtom';
import * as Location from 'expo-location';
import { getCurrentPositionAsync } from 'expo-location';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import { Alert, Linking, Platform, Pressable, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms';
import BackDarkIcon from '@/assets/images/svg/BackDarkIcon';
import { Box, Stack } from '@/shared/components/base';
import { StatusBar } from 'expo-status-bar';
import { Spacing } from '@/shared/constants/spacing';
import SheetHeader from '@/shared/components/ui/pick/SheetHeader';
import ArrowUpCircleIcon from '@/assets/images/svg/ArrowUpCircleIcon';
import TicketCode from '@/shared/components/ui/pick/TicketCode';
import TicketDetail from '@/shared/components/ui/pick/TicketDetail';
import ActionStack from '@/shared/components/ui/pick/ActionStack';
import CallIcon from '@/assets/images/svg/CallIcon';
import ChatIcon from '@/assets/images/svg/ChatIcon';
import TicketIcon from '@/assets/images/svg/TicketIcon';
import BottomActionButton from '@/shared/components/ui/pick/BottomActionButton';
import * as React from 'react';
import useContainerDetail from '@/shared/services/queries/dashboard/useContainerDetail';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';

const MapViewLazy = lazy(() => import('@/shared/components/ui/pick/LazyMap'));

type SearchParams = {
  container_id: string;
};

export default function Pick() {
  const { container_id } = useLocalSearchParams<SearchParams>();

  const { step, retry } = useLocalSearchParams<{
    step?: PICK_STEP;
    retry?: 'retry';
  }>();

  const snapPoints = useMemo(() => ['70%', '20%'], []);
  const router = useRouter();
  const { colors } = useTheme();
  const ref = useRef<BottomSheetModal>(null);
  const [{ step: currentStep, checkInLocation }, setState] =
    usePickLocationState();
  const { data } = useContainerDetail({ container_id });
  const [, setOverlay] = useAppOverlayState();

  useEffect(() => {
    if (step) {
      setState({ step, container_id });
    }
  }, [step, container_id, setState]);

  const [userLocation, setUserLocation] = useState<$Geo>();
  const { fn: setPickLocation } = useSetPickLocationFn();
  const { mutateAsync: checkIn, isSuccess, isError, isPending } = useCheckIn();

  const handleBack = () => {
    setState({
      step: PICK_STEP.CHECKIN,
      container_id,
    });
    router.dismissAll();
  };

  const handleMiniSheet = () => {
    ref.current?.snapToIndex(1);
  };

  useEffect(() => {
    Location.requestForegroundPermissionsAsync().then((r) => {
      if (r.granted) {
        Location.requestForegroundPermissionsAsync().then((r) => {
          getCurrentPositionAsync().then((data) => {
            setState((pre) => ({
              ...pre,
              checkInLocation: {
                longitude: data.coords.longitude,
                latitude: data.coords.latitude,
              },
            }));
            setUserLocation({
              lat: data.coords.latitude.toString(),
              lng: data.coords.longitude.toString(),
            });
          });
        });
      } else {
        Alert.alert(
          'Cấp quyền',
          'Bạn cần cấp quyền truy cập vị trí để checkin',
          [
            {
              text: 'Cấp quyền',
            },
          ]
        );
      }
    });
  }, [setState]);

  const handlePressCheckIn = React.useCallback(() => {
    Location.requestForegroundPermissionsAsync().then((r) => {
      if (r.granted) {
        getCurrentPositionAsync().then((data) => {
          checkIn({
            container_id,
            location: {
              lat: data.coords.latitude.toString(),
              lng: data.coords.longitude.toString(),
            },
          }).then(() => {
            setState({ step: PICK_STEP.RECEIVE_LOCATION, container_id });
          });
        });
      } else {
        toast('Vui lòng cấp quyền truy cập vị trí của bạn!', {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          icon: '',
          styles: {
            pressable: {
              backgroundColor: colors.warn,
            },
          },
        });
      }
    });
    // setPickLocation({
    //   latitude: 0,
    //   longitude: 0,
    // });
  }, [checkIn, colors.warn, container_id, setState]);

  useEffect(() => {
    setOverlay((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending, setOverlay]);

  const handlePressTakePhotoStep = React.useCallback(() => {
    router.push(`/take-photo`);
  }, [router]);

  const handlePressCantPickup = React.useCallback(() => {
    router.push('/cant-pick-up');
  }, [router]);

  const handleCall = React.useCallback((phoneNumber: string) => {
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  }, []);

  const handleSendMessage = React.useCallback(async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync([data?.pickupContactPhone || '0'], '');
    }
  }, [data?.pickupContactPhone]);

  return (
    <BottomSheetModalProvider>
      <Pressable onPress={handleBack} style={styles.back}>
        <BackDarkIcon />
      </Pressable>
      <Box className="flex-1">
        <StatusBar style="dark" />
        <Suspense fallback={<Box className="w-full h-full" />}>
          {userLocation?.lat && userLocation?.lng && (
            <MapViewLazy
              long={Number(userLocation?.lng)}
              lat={Number(userLocation?.lat)}
              zoom={{
                lng: String(checkInLocation?.longitude),
                lat: String(checkInLocation?.latitude),
              }}
              desLat={data?.pickupGeo.lat!}
              desLng={data?.pickupGeo.lng!}
            />
          )}
        </Suspense>
        <BottomSheet
          enableDynamicSizing
          ref={ref}
          handleIndicatorStyle={styles.indicator}
          index={1}
          snapPoints={snapPoints}
        >
          <BottomSheetView style={styles.inset}>
            <Stack direction="column" gap={Spacing.SPACING_10}>
              <SheetHeader
                lat={data?.pickupGeo.lat}
                lng={data?.pickupGeo.lng}
                icon={<ArrowUpCircleIcon />}
                onMinimize={handleMiniSheet}
                title="Lấy hàng"
              />
              <TicketCode
                code={data?.contNo || ''}
                bks={data?.truckNumberPlate || ''}
              />
              <TicketDetail
                location={data?.fullPickupAddress || ''}
                pickup_location={data?.pickupAddress || ''}
                sender_name={data?.pickupContact || ''}
              />
              <ActionStack
                actions={[
                  {
                    icon: <CallIcon />,
                    label: 'Gọi người gửi',
                    onPress: () => {
                      handleCall(data?.pickupContactPhone || '0');
                    },
                  },
                  {
                    icon: <ChatIcon />,
                    label: 'Nhắn tin người gửi',
                    onPress: handleSendMessage,
                  },
                  {
                    icon: <TicketIcon />,
                    label: 'Chi tiết ',
                    onPress: () => {
                      router.push(`/container_detail/${container_id}`);
                    },
                  },
                ]}
              />
              <BottomActionButton
                hideRetry={retry === 'retry'}
                step={currentStep}
                handlePressCheckIn={handlePressCheckIn}
                handlePressCantPickup={handlePressCantPickup}
                handlePressTakePhotoStep={handlePressTakePhotoStep}
              />
            </Stack>
          </BottomSheetView>
        </BottomSheet>
      </Box>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  back: {
    position: 'absolute',
    top: Spacing.SPACING_50,
    left: Spacing.SPACING_24,
    zIndex: 999,
  },
  inset: {
    paddingBottom: Platform.select({
      ios: Spacing.SPACING_40,
      android: Spacing.SPACING_20,
    }),
    paddingHorizontal: Spacing.SPACING_12,
  },
  indicator: {
    backgroundColor: '#616161',
  },
});
