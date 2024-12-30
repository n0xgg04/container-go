import * as React from 'react';
import { Box, Button, Stack } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import CardInfor from '@/shared/components/ui/container-page/CardInfor';
import DeliveryStatus from '@/shared/components/ui/container-page/DeliveryStatus';
import CardDelivery from '@/shared/components/ui/container-page/CardDelivery';
import ShippingProcess from '@/shared/components/ui/container-page/ShippingProcess';
import OrderStatus from '@/shared/components/ui/container-page/OrderStatus';
import PodSubmission from '@/shared/components/ui/delivery/PODSubmission';
import { Fonts } from '@/shared/constants/themes';
import { ActivityIndicator } from 'react-native';
import { Href, useRouter } from 'expo-router';
import useContainerDetail from '@/shared/services/queries/dashboard/useContainerDetail';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';
import { useEffect } from 'react';
import { useTheme } from '@/shared/hooks';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import { PICK_STEP } from '@/states/recoil/atoms/PickLocationAtom';
import { ShipmentState } from '@/shared/constants/shipment-state.enum';
import useStartDelivery from '@/shared/services/mutations/home/useStartDelivery';

type Props = {
  back: string;
  container_id: string;
  action: string;
  setShowPopup: (b: boolean) => void;
};

const MainContent = React.memo(
  ({ back, container_id, action, setShowPopup }: Props) => {
    const { colors } = useTheme();
    const router = useRouter();
    const { data, isLoading } = useContainerDetail({ container_id });
    const [colorBtn, setColorBtn] = React.useState(colors.secondaryGreen);
    const { mutateAsync: startDelivery } = useStartDelivery({ container_id });

    const [, setOverlay] = useAppOverlayState();

    useEffect(() => {
      setOverlay((pre) => ({ ...pre, isLoading }));
    }, [isLoading, setOverlay]);

    const pickUpStatus: PICK_STATUS = React.useMemo(() => {
      if (
        ((data?.shipmentState === 'POD_SUBMITTED' ||
          data?.shipmentState === 'PICKUP_SUCCESS' ||
          data?.shipmentState === 'DELIVERY_SUCCESS') &&
          data?.pickupFailureReason === null) ||
        (data?.pickupFailureReason != null &&
          (data?.shipmentState === 'PICKUP_SUCCESS' ||
            data?.shipmentState === 'DELIVERY_SUCCESS'))
      ) {
        return 'DONE';
      } else if (data?.pickupFailureReason != null) {
        return 'FAILED';
      }
      return 'WAITING';
    }, [data]);

    const deliverStatus: PICK_STATUS = React.useMemo(() => {
      if (
        ((data?.shipmentState === 'POD_SUBMITTED' ||
          data?.shipmentState === 'DELIVERY_SUCCESS') &&
          data?.deliveryFailureReason === null) ||
        (data?.deliveryFailureReason != null &&
          data?.shipmentState === 'DELIVERY_SUCCESS')
      ) {
        return 'DONE';
      } else if (data?.deliveryFailureReason != null) {
        return 'FAILED';
      }
      return 'WAITING';
    }, [data]);

    const buttonData = React.useMemo(() => {
      if (
        (data?.pickupFailureReason &&
          data?.shipmentState !== 'PICKUP_SUCCESS') ||
        (data?.deliveryFailureReason &&
          data.shipmentState !== 'DELIVERY_SUCCESS')
      ) {
        return {
          label: 'Kết thúc',
          onPress: undefined,
        };
      } else if (data?.shipmentStarted == null) {
        return {
          label: 'Bắt đầu vận chuyển',
          onPress: () => {
            startDelivery()
              .then(() => {
                router.push(`/pick/${container_id}`);
              })
              .catch(() => {
                toast('Không thể bắt đầu vận chuyển!', {
                  duration: 4000,
                  position: ToastPosition.BOTTOM,
                  icon: '',
                  styles: {
                    pressable: {
                      backgroundColor: colors.warn,
                    },
                  },
                });
              });
          },
        };
      } else if (
        data?.pickupCheckinGeo == null ||
        (data?.pickupCheckinGeo.lat == null &&
          data?.pickupCheckinGeo.lng == null)
      ) {
        return {
          label: 'Checkin -  Lấy hàng',
          onPress: () =>
            router.push(
              `/pick/${container_id}?step=${PICK_STEP.CHECKIN}` as Href<`/pick/${string}?step=CHECKIN`>
            ),
        };
      } else if (data?.shipmentState === ShipmentState.SHIPMENT_PLAN_SENT) {
        return {
          label: 'Lấy hàng',
          onPress: () =>
            router.push(
              `/pick/${container_id}?step=${PICK_STEP.RECEIVE_LOCATION}` as Href<`/pick/${string}?step=RECEIVE_LOCATION`>
            ),
        };
      } else if (data?.shipmentState === ShipmentState.PICKUP_SUCCESS) {
        if (data?.deliveryCheckinGeo == null) {
          return {
            label: 'Checkin - Giao hàng',
            onPress: () => router.push(`/delivery/pick/${container_id}`),
          };
        } else {
          return {
            label: 'Giao hàng',
            onPress: () => {
              router.push(`/delivery/pick/${container_id}?type=success` as any);
            },
          };
        }
      } else if (data?.shipmentState === ShipmentState.DELIVERY_SUCCESS) {
        return {
          label: 'Kết thúc giao hàng',
          onPress: () => setShowPopup(true),
        };
      } else {
        setColorBtn(colors.textDarkGray);
        return {
          label: 'Kết thúc',
          onPress: () => {},
        };
      }
    }, [
      colors.textDarkGray,
      colors.warn,
      container_id,
      data?.deliveryCheckinGeo,
      data?.deliveryFailureReason,
      data?.pickupCheckinGeo,
      data?.pickupFailureReason,
      data?.shipmentStarted,
      data?.shipmentState,
      router,
      setShowPopup,
      startDelivery,
    ]);

    const handleGoBack = () => {
      if (back === 'home') {
        router.replace('/');
      }
      router.back();
    };

    return (
      <Scaffold>
        <Stack direction="column" gap={Spacing.SPACING_16}>
          <Scaffold.AppBar
            leftSection={<BackIcon onPress={() => handleGoBack()} />}
          >
            Chi tiết container
          </Scaffold.AppBar>

          {data && (
            <Scaffold.MainBox>
              <CardInfor {...data} />
              <DeliveryStatus
                pickStatus={pickUpStatus}
                status="Pickup"
                plannedDate={data.plannedPickupDate}
                iconStatus={data.shipmentState}
              />
              <CardDelivery {...data} pickStatus={pickUpStatus} type="Pickup" />
              <Box
                className="w-full"
                style={{
                  marginTop: Spacing.SPACING_16,
                  backgroundColor: '#EFEFEF',
                  height: 20,
                }}
              />
              <DeliveryStatus
                iconStatus={data?.shipmentState}
                status="Delivery"
                pickStatus={deliverStatus}
                plannedDate={data.plannedDropoffDate}
              />
              <CardDelivery
                pickStatus={deliverStatus}
                {...data}
                type="Delivery"
              />
              <ShippingProcess />
              <OrderStatus shipmentHistories={data.shipmentHistories} />
              {action === 'submit' ? (
                <PodSubmission container_id={container_id} />
              ) : (
                <Button
                  onPress={buttonData?.onPress}
                  style={{
                    height: Spacing.SPACING_44,
                    marginTop: Spacing.SPACING_20,
                    backgroundColor: buttonData?.onPress
                      ? colorBtn
                      : colors.textGray,
                  }}
                  labelStyle={{
                    fontSize: 16,
                    color: '#fff',
                    fontFamily: Fonts.Bold,
                    textAlign: 'center',
                  }}
                >
                  {buttonData?.label || ''}
                </Button>
              )}
            </Scaffold.MainBox>
          )}
          {isLoading && <ActivityIndicator />}
        </Stack>
      </Scaffold>
    );
  }
);

export default MainContent;
