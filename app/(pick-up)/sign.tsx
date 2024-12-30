import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import SignForm from '@/shared/components/ui/sign/SignForm';

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
        <SignForm />
      </Scaffold.MainBox>
    </Scaffold>
  );
}
