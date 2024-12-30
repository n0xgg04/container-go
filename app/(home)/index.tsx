import * as React from 'react';
import { Stack } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import { ActivityIndicator } from 'react-native';
import DashboardAppBar from '@/shared/components/ui/home/DashboardAppBar';
import DashboardStatistic from '@/shared/components/ui/home/DashboardStatistic';
import Statistic from '@/shared/components/ui/home/Statistic';
import Scaffold from '@/shared/components/common/Scaffold';
import useGetDashboardInfoByDate from '@/shared/services/mutations/home/getDashboardInfoByDate';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import { lazy, Suspense } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import DeliveringCardList from '@/shared/components/ui/home/DeliveringCardList';
import { useTheme } from '@/shared/hooks';

const DeliveringList = lazy(
  () => import('@/shared/components/ui/home/DeliveringList')
);

export default React.memo(function Home() {
  const [{ from, to }] = useDashboardInfoState();
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const { refetch, isLoading, isRefetching } = useGetDashboardInfoByDate({
    from,
    to,
  });

  const refresh = React.useCallback(async () => {
    await Promise.all([refetch(), queryClient.refetchQueries({ stale: true })]);
  }, [queryClient, refetch]);

  return (
    <Scaffold isRefreshing={isLoading || isRefetching} onRefresh={refresh}>
      <Stack direction="column" gap={Spacing.SPACING_16}>
        <DashboardAppBar />
        <DashboardStatistic />
        <Scaffold.MainBox>
          <Suspense fallback={<ActivityIndicator color="black" />}>
            <Statistic />
          </Suspense>
          <Suspense
            fallback={
              <ActivityIndicator
                style={{
                  marginTop: Spacing.SPACING_10,
                }}
                color={colors.primaryBackground}
              />
            }
          >
            <DeliveringCardList />
          </Suspense>
          <Suspense
            fallback={
              <ActivityIndicator
                style={{
                  marginTop: Spacing.SPACING_10,
                }}
                color={colors.primaryBackground}
              />
            }
          >
            <DeliveringList />
          </Suspense>
        </Scaffold.MainBox>
      </Stack>
    </Scaffold>
  );
});
