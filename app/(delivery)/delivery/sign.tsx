import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import DeliverySignForm from '@/shared/components/ui/delivery/DeliverySignForm';

export default function Sign() {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Scaffold disableScroll>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        Chữ ký
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <DeliverySignForm />
      </Scaffold.MainBox>
    </Scaffold>
  );
}
