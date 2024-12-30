import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import PickUpInfo from '@/shared/components/ui/review/PickUpInfo';
import { Stack } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import SenderInfo from '@/shared/components/ui/review/SenderInfo';
import SignInfo from '@/shared/components/ui/review/SignInfo';
import SignPreview from '@/shared/components/ui/review/SignPreview';
import DeliveryPhotoList from '@/shared/components/ui/delivery/DeliveryPhotoList';
import DeliveryNoteForm from '@/shared/components/ui/delivery/DeliveryNoteForm';
import useSignState from '@/states/hooks/useSignState';
import moment from 'moment';

export default function Review() {
  const router = useRouter();
  const [{ signAt }] = useSignState();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        Xác nhận
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <Stack gap={Spacing.SPACING_12} direction="column">
          <PickUpInfo>08:32 AM - 16.01.2024</PickUpInfo>
          <DeliveryPhotoList />
          <SenderInfo />
          <SignInfo>
            {moment(signAt, 'YYYY-MM-DD HH:mm:ss').format(
              'hh:mm A - DD.MM.YYYY'
            )}
          </SignInfo>
          <SignPreview />
          <DeliveryNoteForm />
        </Stack>
      </Scaffold.MainBox>
    </Scaffold>
  );
}
