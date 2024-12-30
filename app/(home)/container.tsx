import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import { Spacing } from '@/shared/constants/spacing';
import DashboardAppBar from '@/shared/components/ui/home/DashboardAppBar';
import { Stack } from '@/shared/components/base';
import { Suspense } from 'react';
import LoadingView from '@/shared/components/common/LoadingView';
import ContainerPage from '@/shared/components/ui/container-page/ContainerPage';

export default React.memo(function Containers() {
  return (
    <Scaffold disableScroll>
      <Stack direction="column" gap={Spacing.SPACING_16}>
        <DashboardAppBar isFilter />
        <Scaffold.MainBox>
          <Suspense fallback={<LoadingView />}>
            <ContainerPage />
          </Suspense>
        </Scaffold.MainBox>
      </Stack>
    </Scaffold>
  );
});
