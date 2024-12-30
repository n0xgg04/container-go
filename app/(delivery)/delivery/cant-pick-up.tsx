import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useRouter } from 'expo-router';
import CanntDelivery from '@/shared/components/ui/delivery/CanntDelivery';

export default function CantPickUp() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        Không giao được hàng
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <CanntDelivery />
      </Scaffold.MainBox>
    </Scaffold>
  );
}
