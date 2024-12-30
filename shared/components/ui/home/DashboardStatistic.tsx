import * as React from 'react';
import { Stack } from '@/shared/components/base';
import CardInformation from '@/shared/components/ui/home/CardInformation';
import { Spacing } from '@/shared/constants/spacing';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/shared/hooks';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import useGetDashboardInfoByDate from '@/shared/services/mutations/home/getDashboardInfoByDate';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRouter } from 'expo-router';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';

const DashboardStatistic = React.memo(() => {
  const { colors } = useTheme();
  const router = useRouter();
  const [{ from, to }] = useDashboardInfoState();
  const { data, isPending, isRefetching } = useGetDashboardInfoByDate({
    from,
    to,
  });

  const inProgress = React.useMemo(() => {
    const ok = data?.summaries.find((el) => el?.status === 'NOT_STARTED');
    return (ok && ok.amount) || '0';
  }, [data?.summaries]);

  const notStarted = React.useMemo(() => {
    const ok = data?.summaries.find((el) => el?.status === 'IN_PROGRESS');
    return (ok && ok.amount) || '0';
  }, [data?.summaries]);

  const pod = React.useMemo(() => {
    const ok = data?.summaries.find((el) => el?.status === 'COMPLETED');
    return (ok && ok.amount) || '0';
  }, [data?.summaries]);

  return (
    <Stack className="justify-center items-center">
      <Stack style={styles.container} gap={Spacing.SPACING_8}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/container',
              params: {
                id: 0,
                name: SummariesStatus.IN_PROGRESS,
              },
            })
          }
        >
          <CardInformation
            numberColor={colors.textYellow}
            number={isRefetching || isPending ? '-' : inProgress || '-'}
            label="Chờ vận chuyển"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/container',
              params: {
                id: 1,
                name: SummariesStatus.NOT_STARTED,
              },
            })
          }
        >
          <CardInformation
            numberColor={colors.textOceanBlue}
            number={isRefetching || isPending ? '-' : notStarted || '-'}
            label="Đang vận chuyển"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/container',
              params: {
                id: 2,
                name: SummariesStatus.COMPLETED,
              },
            })
          }
        >
          <CardInformation
            numberColor={colors.textGreen}
            number={isRefetching || isPending ? '-' : pod || '-'}
            label="POD Pending"
          />
        </TouchableOpacity>
      </Stack>
    </Stack>
  );
});

export default DashboardStatistic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(242,243,251,0.3)',
    padding: Spacing.SPACING_8,
    borderRadius: Spacing.SPACING_12,
    marginHorizontal: Spacing.SPACING_16,
  },
});
