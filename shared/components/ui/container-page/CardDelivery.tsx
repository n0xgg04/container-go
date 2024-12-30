import React, { Suspense } from 'react';
import { Stack, Typography } from '../../base';
import { Spacing } from '@/shared/constants/spacing';
import LineReceiver from './LineReceiver';
import { ActivityIndicator, Dimensions } from 'react-native';
import { useTheme } from '@/shared/hooks';
import LineAddress from './LineAddress';
import LineNote from './LineNote';
import SimpleButton from '@/shared/components/base/SimpleButton';
import { Href, useRouter } from 'expo-router';
import { PICK_STEP } from '@/states/recoil/atoms/PickLocationAtom';

export interface IPCardDelivery extends $GetContainerDetailResponse {
  type: 'Pickup' | 'Delivery';
  pickStatus: PICK_STATUS;
}

const CardDelivery = React.memo((props: IPCardDelivery) => {
  const router = useRouter();

  const { colors } = useTheme();

  const handleRetryPick = React.useCallback(() => {
    router.push(
      `/pick/${props.id}?step=${PICK_STEP.RECEIVE_LOCATION}&retry=retry` as Href<`/pick/${string}?step=RECEIVE_LOCATION`>
    );
  }, [props.id, router]);

  const handleRetryDelivery = React.useCallback(() => {
    router.push(
      `/delivery/pick/${props.id}?step=${PICK_STEP.RECEIVE_LOCATION}&retry=retry` as Href<`/pick/${string}?step=RECEIVE_LOCATION`>
    );
  }, [props.id, router]);

  const location = React.useMemo(
    () => ({
      lat:
        props.type === 'Pickup'
          ? String(props.pickupGeo.lat)
          : String(props.deliveryGeo.lat),
      lng:
        props.type === 'Pickup'
          ? String(props.pickupGeo.lng)
          : String(props.deliveryGeo.lng),
    }),
    [
      props?.deliveryGeo.lat,
      props?.deliveryGeo.lng,
      props?.pickupGeo.lat,
      props?.pickupGeo.lng,
      props?.type,
    ]
  );

  return (
    <Stack
      direction="column"
      style={{
        width: Dimensions.get('window').width - Spacing.SPACING_36,
        backgroundColor: colors.cardPrimaryBackground,
        justifyContent: 'center',
      }}
      className="border-[1px] rounded-md border-gray-200 px-4 py-5 mt-4"
    >
      <Suspense fallback={<ActivityIndicator />}>
        <Stack direction="column" gap={Spacing.SPACING_3}>
          <Typography
            numberOfLines={2}
            weight="bold"
            color={'black'}
            fontSize={16}
            //width: Dimensions.get('screen').width / 1.9,
          >
            {props.type === 'Pickup'
              ? props.pickupAddress
              : props.dropoffAddress}
          </Typography>
          <LineAddress {...props} location={location} />
          <LineReceiver {...props} />
          <LineNote {...props} />
          {props.pickStatus === 'FAILED' && props.type === 'Pickup' && (
            <SimpleButton
              onPress={handleRetryPick}
              style={{
                marginTop: Spacing.SPACING_12,
                height: Spacing.SPACING_51,
              }}
              labelColor="white"
              bgColor="warn"
            >
              Thực hiện lại
            </SimpleButton>
          )}
          {props.pickStatus === 'FAILED' && props.type === 'Delivery' && (
            <SimpleButton
              onPress={handleRetryDelivery}
              style={{
                marginTop: Spacing.SPACING_12,
                height: Spacing.SPACING_51,
              }}
              labelColor="white"
              bgColor="warn"
            >
              Thực hiện lại
            </SimpleButton>
          )}
        </Stack>
      </Suspense>
    </Stack>
  );
});

export default CardDelivery;
