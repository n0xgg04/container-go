import * as React from 'react';
import { useEffect, useId } from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import useSearchContainer from '@/shared/services/mutations/home/useSearchContainer';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import useGetDashboardInfoByDate from '@/shared/services/mutations/home/getDashboardInfoByDate';
import { ActivityIndicator, Dimensions, FlatList, View } from 'react-native';
import { useTheme } from '@/shared/hooks';
import DeliveringCard from '@/shared/components/ui/home/DeliveringCard';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';
import { insetPadding } from '@/shared/constants/themes';
import EmptyIcon2 from '@/assets/images/svg/EmptyIcon2';

const DeliveringList = React.memo(() => {
  const [{ from, to }] = useDashboardInfoState();
  const [, setOverlayState] = useAppOverlayState();
  const { colors } = useTheme();
  const { data: dashboardData } = useGetDashboardInfoByDate({
    from,
    to,
  });
  const {
    data: summariesData,
    isPending,
    mutate: fetchContainer,
  } = useSearchContainer({
    from,
    to,
    type: SummariesStatus.IN_PROGRESS,
  });

  const progressData = React.useMemo(() => {
    return dashboardData?.summaries.find(
      (item) => item?.status === SummariesStatus.IN_PROGRESS
    );
  }, [dashboardData?.summaries]);

  useEffect(() => {
    if (progressData && progressData.amount > 0) {
      fetchContainer();
    }
  }, [progressData, fetchContainer]);

  useEffect(() => {
    setOverlayState((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending, setOverlayState]);

  const deliverData: ItemData[] = React.useMemo(() => {
    if (!summariesData) return [];

    return summariesData.flatMap((item) =>
      item.containers.map((container) => ({
        id: container.contNo,
        plate: container.truckNumberPlate,
        type: container.truckType,
        distance: container.distance.toString(),
        date: container.pickupFromDate,
        address: item.dropoffAddress,
        container_id: container.id,
        pickupLocation: {
          lat: container.pickupGeo.lat,
          lng: container.pickupGeo.lng,
        },
      }))
    );
  }, [summariesData]);

  return (
    <View
      style={{
        marginTop: Spacing.SPACING_15,
        display: 'flex',
        flexDirection: 'column',
        width: Dimensions.get('screen').width - insetPadding * 2,
      }}
    >
      <Typography weight="bold" color="textDarkGray" className="mb-4">
        Đang vận chuyển
      </Typography>
      {isPending ? (
        <Stack direction="row" className="justify-center">
          <ActivityIndicator size="large" color={colors.primaryBackground} />
        </Stack>
      ) : (
        <List deliverData={deliverData} />
      )}
    </View>
  );
});

DeliveringList.displayName = 'DeliveringList';

export default DeliveringList;

const List = React.memo(({ deliverData }: { deliverData: ItemData[] }) => {
  const id = useId();

  const renderItem = React.useCallback(
    ({ item }: { item: ItemData }) => <DeliveringCard item={item} />,
    []
  );

  const seperator = React.useCallback(() => {
    return (
      <View
        style={{
          width: Spacing.SPACING_8,
        }}
      />
    );
  }, []);

  return (
    <FlatList
      snapToInterval={Spacing.SPACING_338}
      decelerationRate="fast"
      horizontal
      alwaysBounceHorizontal={false}
      nestedScrollEnabled={true}
      data={deliverData}
      renderItem={renderItem}
      ItemSeparatorComponent={seperator}
      keyExtractor={(item) => id + item.id}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      showsHorizontalScrollIndicator={false}
      windowSize={2}
      initialNumToRender={1}
      maxToRenderPerBatch={2}
      contentContainerStyle={!deliverData.length && { flex: 1 }}
      ListEmptyComponent={() => (
        <Stack direction="row" className="flex-1 justify-center">
          <EmptyIcon2
            width={Spacing.SPACING_100}
            height={Spacing.SPACING_100}
          />
        </Stack>
      )}
    />
  );
});
