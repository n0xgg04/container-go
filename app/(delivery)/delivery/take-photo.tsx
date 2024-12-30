import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useRouter } from 'expo-router';
import CameraView from '@/shared/components/ui/delivery/CameraView';

export default function TakePhoto() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        Chụp ảnh
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <CameraView />
      </Scaffold.MainBox>
    </Scaffold>
  );
}
