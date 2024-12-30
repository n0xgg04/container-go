import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useRouter } from 'expo-router';
import CanntPickUp from '@/shared/components/ui/pick/CanntPickUp';

export default function CantPickUp() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        Không lấy được hàng
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <CanntPickUp />
      </Scaffold.MainBox>
    </Scaffold>
  );
}
