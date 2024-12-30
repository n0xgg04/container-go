import * as React from 'react';
import { Stack } from '@/shared/components/base';
import SimpleButton from '@/shared/components/base/SimpleButton';
import { Spacing } from '@/shared/constants/spacing';
import Popup from '@/shared/components/common/Popup';
import { useRouter } from 'expo-router';
import { useTransition } from 'react';

type Props = {
  container_id: string;
  closePopup: React.Dispatch<React.SetStateAction<boolean>>;
};
const PopupPod = React.memo(({ container_id, closePopup }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <Popup
      visible={true}
      title={
        'Để hoàn tất vận chuyển yêu cầu upload tất cả POD và Biên bản trả container rỗng.'
      }
      action={
        <Stack className="justify-end w-full" direction="row">
          {/*<SimpleButton*/}
          {/*  containerStyle={{*/}
          {/*    width: Spacing.SPACING_100,*/}
          {/*  }}*/}
          {/*  bgColor="primary"*/}
          {/*  labelStyle={{*/}
          {/*    fontWeight: 'bold',*/}
          {/*    color: 'white',*/}
          {/*  }}*/}
          {/*>*/}
          {/*  Chụp POD*/}
          {/*</SimpleButton>*/}
          <SimpleButton
            onPress={() => {
              startTransition(() => closePopup(false));
              router.push(`/delivery/pod/${container_id}`);
            }}
            containerStyle={{
              width: Spacing.SPACING_152,
            }}
            bgColor="textOceanBlue"
            labelStyle={{
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            Upload POD
          </SimpleButton>
        </Stack>
      }
      onClose={() => {}}
    />
  );
});

export default PopupPod;
