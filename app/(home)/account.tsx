import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import { Stack } from '@/shared/components/base';
import UserInfoCard from '@/shared/components/ui/account/UserInfoCard';
import DriverInfo from '@/shared/components/ui/account/DriverInfo';
import { Spacing } from '@/shared/constants/spacing';
import HealthInfo from '@/shared/components/ui/account/HealthInfo';
import ContractInfo from '@/shared/components/ui/account/ContractInfo';
import RatingInfo from '@/shared/components/ui/account/RatingInfo';
import useDriverInfoData from '@/shared/services/queries/dashboard/useDriverInfoData';

export default React.memo(function () {
  const { refetch, isLoading } = useDriverInfoData();

  return (
    <>
      <Scaffold isRefreshing={isLoading} onRefresh={refetch}>
        <Scaffold.AppBar>Account</Scaffold.AppBar>
        <Scaffold.MainBox>
          <Stack direction="column" gap={Spacing.SPACING_36}>
            <UserInfoCard />
            <DriverInfo />
            <HealthInfo />
            <ContractInfo />
            <RatingInfo />
          </Stack>
        </Scaffold.MainBox>
      </Scaffold>
    </>
  );
});
