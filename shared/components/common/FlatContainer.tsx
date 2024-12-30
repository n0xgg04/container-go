import * as React from 'react';
import { Box } from '@/shared/components/base/Box';
import { useTheme } from '@/shared/hooks';
import { FlatList, ListRenderItem, RefreshControl } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useScaffoldContext } from '@/shared/provider/ScaffordContextProvider';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import useGetDashboardInfoByDate from '@/shared/services/mutations/home/getDashboardInfoByDate';
import { useEffect } from 'react';
import useSearchContainer from '@/shared/services/mutations/home/useSearchContainer';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';
import EstimateList from '@/shared/components/ui/home/EstimateList';

type Props = {
  containerStyle?: React.ComponentProps<typeof Box>['style'];
  bgColor?: string;
  safeArea?: boolean;
  disableScroll?: boolean;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  headerComponent: () => React.ReactNode;
};

const FlatContainer = React.memo<
  React.PropsWithChildren<Props> & React.ComponentProps<typeof Box>
>(function ({
  containerStyle,
  children,
  bgColor = 'mainBackground',
  safeArea = false,
  disableScroll = false,
  isRefreshing = false,
  onRefresh,
  headerComponent,
  ...props
}) {
  const { colors } = useTheme();
  const safeAreaInsets = useSafeAreaInsets();
  const { offsetY } = useScaffoldContext();

  const [{ from, to }] = useDashboardInfoState();
  const { data } = useGetDashboardInfoByDate({ from, to });

  const {
    data: inProgressData,
    isPending,
    mutate: getData,
  } = useSearchContainer({
    from,
    to,
    type: SummariesStatus.NOT_STARTED,
  });

  useEffect(() => {
    if (data?.waitingForShipment && data?.waitingForShipment.length > 0) {
      getData();
    }
  }, [data?.summaries, data?.waitingForShipment, getData]);

  const renderItem: ListRenderItem<$SearchContainerData> = React.useCallback(
    ({ item }) => {
      return <EstimateList card_data={item.containers} />;
    },
    []
  );

  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      data={inProgressData}
      renderItem={renderItem}
      horizontal={false}
      initialNumToRender={2}
      showsVerticalScrollIndicator={false}
      bounces={true}
      nestedScrollEnabled
      refreshControl={
        onRefresh ? (
          <RefreshControl
            tintColor="white"
            refreshing={isRefreshing}
            onRefresh={onRefresh}
          />
        ) : undefined
      }
      scrollEnabled={!disableScroll}
      style={{
        flex: 1,
        backgroundColor: colors.primaryBackground,
        paddingTop: safeAreaInsets.top,
      }}
    />
  );
});
FlatContainer.displayName = 'Container';
export { FlatContainer };
