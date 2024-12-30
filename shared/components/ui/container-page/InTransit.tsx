/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import { View } from 'moti';
import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '../../base';
import { Shipment } from '../home/EstimateList';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, Dimensions, ListRenderItem } from 'react-native';
import EstimateDeliveryCard from '../home/EstimateDeliveryCard';
import { useTheme } from '@/shared/hooks';
import LocationGreenNonBorder from '@/assets/images/svg/LocationGreenNonBorder';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';
import useSearchContainer from '@/shared/services/mutations/home/useSearchContainer';
import useFilterDateState from '@/states/hooks/useFilterDateState';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import { insetPadding } from '@/shared/constants/themes';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';

interface PInTransit {
  summariesStatus: SummariesStatus;
}

type DeliveryItem = {
  data: Shipment[];
  dropoffAddress: string;
};

const InTransit = React.memo(({ summariesStatus }: PInTransit) => {
  const { colors } = useTheme();
  const [{ from, to }] = useDashboardInfoState();
  const [{ fromDate, toDate }] = useFilterDateState();
  const [dateTime, setDateTime] = useState({ fromDate: from, toDate: to });
  const [, setOverlayState] = useAppOverlayState();
  const {
    data: summariesData,
    mutate: fetchContainer,
    isPending,
  } = useSearchContainer({
    to: dateTime.toDate,
    from: dateTime.fromDate,
    type: summariesStatus,
  });

  useEffect(() => {
    if (!isPending) {
      setTimeout(() =>
        setOverlayState((pre) => ({ ...pre, isLoading: false }))
      );
    } else {
      setOverlayState((pre) => ({ ...pre, isLoading: true }));
    }
  }, [isPending, setOverlayState]);

  useEffect(() => {
    if (fromDate && toDate) {
      setDateTime({ fromDate, toDate });
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    if (from && to) {
      setDateTime({ fromDate: from, toDate: to });
    }
  }, [from, to]);

  useEffect(() => {
    if (dateTime.fromDate && dateTime.toDate) {
      fetchContainer();
    }
  }, [dateTime, summariesStatus]);

  const deliverData = React.useMemo(() => {
    if (!summariesData) return [];
    let containers: { dropoffAddress: string; data: Shipment[] }[] = [];
    summariesData?.forEach((item) => {
      let items: any[] = [];
      item.containers.forEach((item) => {
        items = items.concat({
          id: item.contNo,
          bill_id: item.truckNumberPlate,
          type: item.truckType,
          distance: `${item.distance}`,
          receive_date: item.dropoffUntilDate,
          sender_phone: item.pickupContactPhone,
          receiver_phone: item.dropoffContactPhone,
          sender_note: item.pickupNote || '',
          receiver_note: item.deliveryNote || '',
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
        });
      });
      containers = [
        ...containers,
        {
          dropoffAddress: item.dropoffAddress,
          data: items,
        },
      ];
    });
    return [...containers];
  }, [summariesData?.length]);

  const renderItem: ListRenderItem<DeliveryItem> = React.useCallback(
    ({ item, index }) => {
      if (item.dropoffAddress.length === 1) {
        return (
          <View
            key={item.dropoffAddress + index}
            style={{}}
            className={index === deliverData.length - 1 ? 'mb-16' : ''}
          >
            <EstimateDeliveryCard key={index} item={item.data as any} />;
          </View>
        );
      } else {
        return renderHorizontalItem(item);
      }
    },
    []
  );

  const renderHorizontalItem = React.useCallback(
    (item: DeliveryItem) => (
      <Stack
        direction="column"
        gap={Spacing.SPACING_5}
        key={item.dropoffAddress}
        style={{
          paddingHorizontal: Spacing.SPACING_5,
          borderWidth: item.data.length > 1 ? Spacing.SPACING_1 : 0,
          borderColor: colors.borderGray,
          borderRadius: Spacing.SPACING_8,
          width: Dimensions.get('screen').width - 2 * insetPadding,
        }}
        className={item.data.length > 1 ? 'my-1' : 'my-1'}
      >
        <TransitInfo item={item} colors={colors} />
        <TransitList item={item} />
      </Stack>
    ),
    []
  );

  return (
    <FlatList
      nestedScrollEnabled
      data={deliverData}
      renderItem={renderItem}
      keyExtractor={(item) => item.dropoffAddress}
      ListFooterComponent={
        isPending ? (
          <ActivityIndicator
            style={{
              marginTop: Spacing.SPACING_26,
            }}
            color={colors.primaryBackground}
          />
        ) : null
      }
    />
  );
});

const TransitInfo = React.memo(({ item, colors }: any) => {
  return (
    <View
      style={{
        backgroundColor: colors.mainBackground,
        width: '100%',
        position: 'relative',
        paddingTop: Spacing.SPACING_4,
      }}
    >
      {item.data.length > 1 && (
        <Stack className="justify-between">
          <Stack className="items-center">
            <LocationGreenNonBorder className="mr-2" />
            <Typography
              fontSize={FontSize.FONT_SIZE_14}
              weight="bold"
              color="black"
            >
              {item.dropoffAddress}
            </Typography>
          </Stack>
          <Stack
            className="items-center justify-center"
            style={{
              width: Spacing.SPACING_24,
              height: Spacing.SPACING_24,
              backgroundColor: colors.gray,
              borderRadius: Spacing.SPACING_4,
            }}
          >
            <Typography weight="bold" color="#fff">
              {item.data.length}
            </Typography>
          </Stack>
        </Stack>
      )}
    </View>
  );
});

const TransitList = React.memo(({ item }: any) => {
  const renderItem = React.useCallback(({ item }: any) => {
    return <EstimateDeliveryCard isGroup item={item as any} />;
  }, []);

  if (item.data.length === 1) {
    return <EstimateDeliveryCard item={item.data[0]} />;
  }

  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
      snapToInterval={Spacing.SPACING_338}
      decelerationRate="fast"
      data={item.data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <Box width={Spacing.SPACING_8} />}
      keyExtractor={(item, index) => (item as any).id + index}
      showsVerticalScrollIndicator={false}
      horizontal={true}
    />
  );
});

export default InTransit;
