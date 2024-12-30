import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';
import PodForm from '@/shared/components/ui/delivery/PODForm';

type SearchParams = {
  container_id: string;
};

export default function POD() {
  const router = useRouter();
  const { container_id } = useLocalSearchParams<SearchParams>();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Scaffold disableScroll>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        Upload POD
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <PodForm id={container_id} />
      </Scaffold.MainBox>
    </Scaffold>
  );
}
