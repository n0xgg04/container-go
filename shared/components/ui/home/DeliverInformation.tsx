import * as React from 'react';
import { Stack } from '@/shared/components/base';
import DeliverCard from '@/shared/components/ui/home/DeliverCard';
import DeliverPendingIcon from '@/assets/images/svg/DeliverPendingIcon';
import { Spacing } from '@/shared/constants/spacing';
import useDashboardInfoState from '@/states/hooks/useDashboardInfoState';
import DeliverDoneIcon from '@/assets/images/svg/DeliverDoneIcon';
import DeliverRunningIcon from '@/assets/images/svg/DeliverRunningIcon';
import useGetDashboardInfoByDate from '@/shared/services/mutations/home/getDashboardInfoByDate';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '@/shared/hooks';
import EmptyIcon2 from '@/assets/images/svg/EmptyIcon2';

const RESOURCES = {
  SHIPMENT_IN_PROGRESS: {
    icon: <DeliverPendingIcon />,
    color: '#F4A100',
  },
  PICKUP_SUCCESS: {
    icon: <DeliverRunningIcon />,
    color: '#1699C2',
  },
  DELIVERY_SUCCESS: {
    icon: <DeliverDoneIcon />,
    color: '#0A9345',
  },
};

const DeliverInformation = React.memo(() => {
  const [{ from, to }] = useDashboardInfoState();
  const { data, isPending } = useGetDashboardInfoByDate({ from, to });
  const { colors } = useTheme();

  if (isPending) {
    return (
      <Stack direction="row" className="justify-center">
        <ActivityIndicator size="large" color={colors.textDarkGray} />
      </Stack>
    );
  }

  return (
    <Stack
      direction="column"
      gap={Spacing.SPACING_8}
      className="justify-center"
    >
      {data?.containerStatus.length === 0 && (
        <Stack direction="row" className="justify-center">
          <EmptyIcon2
            width={Spacing.SPACING_100}
            height={Spacing.SPACING_100}
          />
        </Stack>
      )}
      {data?.containerStatus?.map((item, index) => {
        return (
          <DeliverCard
            key={index}
            icon={
              item &&
              (Object.keys(RESOURCES).includes(item.statusCode!) ? (
                RESOURCES[item.statusCode].icon
              ) : (
                <DeliverPendingIcon />
              ))
            }
            color={
              (item &&
                (Object.keys(RESOURCES).includes(item.statusCode!)
                  ? RESOURCES[item.statusCode].color
                  : '#000')) ||
              '#000'
            }
            label={item?.status}
            amount={item?.amount}
          />
        );
      })}
    </Stack>
  );
});

export default DeliverInformation;
