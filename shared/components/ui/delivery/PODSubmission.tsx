import * as React from 'react';
import PODInfo from '@/shared/components/ui/home/PODInfo';
import SimpleButton from '@/shared/components/base/SimpleButton';
import { Spacing } from '@/shared/constants/spacing';
import { Button } from '@/shared/components/base';
import { Fonts } from '@/shared/constants/themes';
import { useRouter } from 'expo-router';
import { useTheme } from '@/shared/hooks';
import usePodUploadState from '@/states/hooks/usePODUploadState';
import { Alert } from 'react-native';
import useFinishShipment from '@/shared/services/mutations/delivery/useFinishShipment';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';
import { useEffect, useTransition } from 'react';
import usePodState from '@/states/hooks/usePODState';

type Props = {
  container_id: string;
};
const PodSubmission = React.memo(({ container_id }: Props) => {
  const router = useRouter();
  const { colors } = useTheme();
  const [{ files }, setFiles] = usePodUploadState();
  const { mutateAsync: finishShipment, isPending } = useFinishShipment();
  const [colorBtn, setColorBtn] = React.useState(colors.secondaryGreen);
  const [pending, startTransition] = useTransition();
  const [, setOverlayState] = useAppOverlayState();
  const [state, setState] = usePodState();

  useEffect(() => {
    setOverlayState((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending]);

  const handleFinish = React.useCallback(() => {
    if (isPending) return;
    finishShipment({ container_id, pod: files })
      .then((res) => {
        startTransition(() => {
          setFiles((pre) => ({ ...pre, files: [] }));
          setState((pre) => ({ ...pre, file: [] }));
        });
        Alert.alert('Đã hoàn tất', 'Đơn hàng đã được hoàn tất thành công!', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      })
      .catch((e) => {
        Alert.alert('Kết thúc thất bại!', e.toString());
      });
  }, [
    colors.primaryBackground,
    container_id,
    files,
    finishShipment,
    isPending,
  ]);

  return (
    <>
      <PODInfo />
      <SimpleButton
        onPress={() => {
          router.back();
        }}
        style={{
          borderColor: colors.textOceanBlue,
          borderWidth: Spacing.SPACING_1,
          borderRadius: Spacing.SPACING_8,
          height: Spacing.SPACING_44,
        }}
        labelColor="textOceanBlue"
      >
        ({files.length}) File đã tải lên
      </SimpleButton>
      <Button
        onPress={handleFinish}
        style={{
          height: Spacing.SPACING_44,
          marginTop: Spacing.SPACING_20,
          backgroundColor: colorBtn,
        }}
        labelStyle={{
          fontSize: 16,
          color: '#fff',
          fontFamily: Fonts.Bold,
          textAlign: 'center',
        }}
      >
        {isPending ? 'Đang xử lý...' : 'Hoàn tất vận chuyển'}
      </Button>
    </>
  );
});

export default PodSubmission;
