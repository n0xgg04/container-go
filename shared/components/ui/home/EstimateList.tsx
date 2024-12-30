import * as React from 'react';
import { Box, Stack, Typography } from '@/shared/components/base';
import { FlatList, ListRenderItem } from 'react-native';
import EstimateDeliveryCard from '@/shared/components/ui/home/EstimateDeliveryCard';
import LocationGreenIcon from '@/assets/images/svg/LocationGreenIcon';
import { Spacing } from '@/shared/constants/spacing';
import { Suspense, useId } from 'react';
import { useTheme } from '@/shared/hooks';
import FontSize from '@/shared/constants/font-scale';

export type Shipment = {
  id: string;
  bill_id: string;
  type: string;
  distance: string;
  receive_date: string;
  sender_phone: string;
  receiver_phone: string;
  sender_note: string;
  receiver_note: string;
  send_date: string;
  receiver_address: string;
  sender_address: string;
  receiver_name: string;
  sender_name: string;
  container_id: string;
};

type Props = {
  card_data?: $Container[];
};

const EstimateList = React.memo(
  ({ card_data }: Props) => {
    const { colors } = useTheme();

    const data = React.useMemo(
      () =>
        card_data?.map((item, index) => ({
          id: item.contNo,
          bill_id: item.truckNumberPlate,
          type: item.truckType,
          distance: item.distance,
          receive_date: item.dropoffUntilDate,
          sender_phone: item.pickupContactPhone,
          receiver_phone: item.dropoffContactPhone,
          sender_note: item.pickupNote,
          receiver_note: item.deliveryNote,
          send_date: item.pickupFromDate,
          receiver_address: item.dropoffAddress,
          sender_address: item.pickupAddress,
          receiver_name: item.dropoffContact,
          sender_name: item.pickupContact,
          container_id: item.id,
          pickupLocation: item.pickupGeo,
          deliveryLocation: item.deliveryGeo,
          pickupPosition: item.pickupPosition,
          sealNo: item.sealNo,
          contNo: item.contNo,
          containerType: item.type,
          note: item.note,
          pickupNote: item.pickupNote,
          deliveryNote: item.deliveryNote,
        })),
      [card_data]
    );

    return (
      <Suspense fallback={null}>
        <Stack
          direction="column"
          style={{
            borderWidth:
              card_data && card_data?.length > 1 ? Spacing.SPACING_1 : 0,
            borderColor: colors.borderGray,
            paddingBottom: Spacing.SPACING_6,
            marginBottom: Spacing.SPACING_12,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: Spacing.SPACING_8,
          }}
        >
          {card_data?.length === 1 ? (
            <CardOne data={data} />
          ) : (
            <CardTwo data={data} len={card_data?.length} />
          )}
        </Stack>
      </Suspense>
    );
  },
  (old, newD) => {
    return old.card_data?.length === newD.card_data?.length;
  }
);

EstimateList.displayName = 'EstimateList';

const CardOne = React.memo(({ data }: any) => {
  return <EstimateDeliveryCard item={data && (data[0] as any)} />;
});

const CardTwo = React.memo(({ data, len }: any) => {
  const { colors } = useTheme();

  return (
    <>
      <Stack
        style={{
          marginBottom: Spacing.SPACING_6,
          paddingHorizontal: Spacing.SPACING_13,
          width: '100%',
        }}
        gap={Spacing.SPACING_8}
      >
        <LocationGreenIcon />
        <Typography
          style={{
            width: '85%',
          }}
          weight="bold"
          color="black"
          fontSize={FontSize.FONT_SIZE_14}
        >
          {data && data[0].receiver_address}
        </Typography>
        <Stack
          style={{
            backgroundColor: colors.gray,
            width: Spacing.SPACING_24,
            height: Spacing.SPACING_24,
            borderRadius: Spacing.SPACING_4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={FontSize.FONT_SIZE_12} weight="bold">
            {len}
          </Typography>
        </Stack>
      </Stack>
      <EmList data={data} />
    </>
  );
});

const EmList = React.memo(({ data }: any) => {
  const id = useId();

  const renderItem: ListRenderItem<any> | null | undefined = React.useCallback(
    ({ item, index }: any) => {
      return <EstimateDeliveryCard isGroup key={index} item={item} />;
    },
    []
  );

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      snapToInterval={Spacing.SPACING_338}
      snapToAlignment="start"
      decelerationRate="fast"
      data={data}
      nestedScrollEnabled={true}
      renderItem={renderItem}
      windowSize={3}
      contentContainerStyle={{
        paddingHorizontal: Spacing.SPACING_8,
      }}
      getItemLayout={(data, index) => ({
        length: Spacing.SPACING_338,
        offset: Spacing.SPACING_338 * index,
        index,
      })}
      ItemSeparatorComponent={Sep}
      keyExtractor={(item) => id + item.id}
      showsVerticalScrollIndicator={false}
      horizontal={true}
    />
  );
});

const Sep = React.memo(() => <Box width={Spacing.SPACING_8} />);

export default EstimateList;
