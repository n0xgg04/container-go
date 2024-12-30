import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/shared/hooks';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { PICK_STEP } from '@/states/recoil/atoms/PickLocationAtom';
import * as Location from 'expo-location';
import { getCurrentPositionAsync } from 'expo-location';
import { Alert, Linking, Platform, Pressable, StyleSheet } from 'react-native';
import * as SMS from 'expo-sms';
import BackDarkIcon from '@/assets/images/svg/BackDarkIcon';
import { Box, Stack } from '@/shared/components/base';
import { StatusBar } from 'expo-status-bar';
import { Spacing } from '@/shared/constants/spacing';
import SheetHeader from '@/shared/components/ui/pick/SheetHeader';
import TicketCode from '@/shared/components/ui/pick/TicketCode';
import TicketDetail from '@/shared/components/ui/pick/TicketDetail';
import ActionStack from '@/shared/components/ui/pick/ActionStack';
import CallIcon from '@/assets/images/svg/CallIcon';
import ChatIcon from '@/assets/images/svg/ChatIcon';
import TicketIcon from '@/assets/images/svg/TicketIcon';
import BottomActionButton from '@/shared/components/ui/pick/BottomActionButton';
import * as React from 'react';
import DeliveryUpIcon from '@/assets/images/svg/DeliveryUpIcon';
import useDeliveryLocationState from '@/states/hooks/useDeliveryLocationState';
import useDeliveryCheckIn from '@/shared/services/mutations/delivery/useCheckIn';
import useContainerDetail from '@/shared/services/queries/dashboard/useContainerDetail';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';

const MapViewLazy = lazy(() => import('@/shared/components/ui/pick/LazyMap'));

type SearchParams = {
  container_id: string;
};

const Pick = React.memo(() => {
  const { container_id } = useLocalSearchParams<SearchParams>();
  const { step = PICK_STEP.CHECKIN, retry } = useLocalSearchParams<{
    step?: PICK_STEP;
    retry?: 'retry';
  }>();
  const [{ step: currentStep }] = useDeliveryLocationState();

  const snapPoints = useMemo(() => ['70%', '20%'], []);
  const router = useRouter();
  const { colors } = useTheme();
  const ref = useRef<BottomSheetModal>(null);
  const [state, setState] = useDeliveryLocationState();
  const { data } = useContainerDetail({ container_id });
  const [userLocation, setUserLocation] = useState<$Geo>();

  const [, setOverlay] = useAppOverlayState();

  useEffect(() => {
    if (step) {
      setState({ step, container_id });
    }
  }, [step, container_id, setState]);

  const { mutateAsync: checkIn, isPending } = useDeliveryCheckIn();

  const handleBack = () => {
    setState({
      step: PICK_STEP.CHECKIN,
      container_id,
    });
    router.dismissAll();
  };

  console.log('re', retry);

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

  useEffect(() => {
    setOverlay((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending, setOverlay]);

  const handlePressCheckIn = () => {
    Location.requestForegroundPermissionsAsync().then((r) => {
      if (r.granted) {
        getCurrentPositionAsync().then((data) => {
          checkIn({
            container_id,
            location: {
              lat: data.coords.latitude.toString(),
              lng: data.coords.longitude.toString(),
            },
          })
            .then(() => {
              setState({ step: PICK_STEP.RECEIVE_LOCATION, container_id });
            })
            .catch(() => {
              Alert.alert('Check in thất bại!', 'Hãy thử lại sau.', [
                { text: 'OK', onPress: () => {} },
              ]);
            });
        });
      } else {
        Alert.alert(
          'Yêu cầu quyền',
          'Vui lòng cấp quyền truy cập vị trí của bạn!',
          [{ text: 'OK', onPress: () => {} }]
        );
      }
    });
  };

  const handlePressTakePhotoStep = () => {
    router.push(`/delivery/take-photo`);
  };

  const handlePressCantPickup = () => {
    router.push('/delivery/cant-pick-up');
  };

  const handleCall = (phoneNumber: string) => {
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${phoneNumber}`;
    } else {
      phoneNumber = `telprompt:${phoneNumber}`;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleSendMessage = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    if (isAvailable) {
      await SMS.sendSMSAsync([data?.dropoffContactPhone || ''], '');
    }
  };

  return (
    <BottomSheetModalProvider>
      <Pressable onPress={handleBack} style={styles.back}>
        <BackDarkIcon />
      </Pressable>
      <Box className="flex-1">
        <StatusBar style="dark" />
        <Suspense fallback={<Box className="w-full h-full" />}>
          {userLocation?.lng && userLocation?.lat && (
            <MapViewLazy
              long={Number(userLocation?.lng)}
              lat={Number(userLocation?.lat)}
              zoom={{
                lng: String(userLocation?.lng),
                lat: String(userLocation?.lat),
              }}
              desLat={data?.deliveryGeo.lat!}
              desLng={data?.deliveryGeo.lng!}
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
                lat={data?.deliveryGeo.lat}
                lng={data?.deliveryGeo.lng}
                color="textOceanBlue"
                icon={<DeliveryUpIcon />}
                onMinimize={handleMiniSheet}
                title="Giao hàng"
              />
              <TicketCode
                code={data?.contNo || ''}
                bks={data?.truckNumberPlate || ''}
              />
              <TicketDetail
                location={data?.dropoffAddress || ''}
                pickup_location={data?.dropoffAddress || ''}
                sender_name={data?.dropoffContact || ''}
              />
              <ActionStack
                actions={[
                  {
                    icon: <CallIcon />,
                    label: 'Gọi người gửi',
                    onPress: () => {
                      handleCall(data?.dropoffContactPhone || '0');
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
                label1="Giao hàng"
                label2="Không giao được hàng"
                loading={isPending}
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
});

export default Pick;

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
