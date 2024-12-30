import * as React from 'react';
import { Button, Stack, Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import Input from '@/shared/components/base/Input';
import { useTheme } from '@/shared/hooks';
import useSignState from '@/states/hooks/useSignState';
import { Spacing } from '@/shared/constants/spacing';
import { StyleSheet } from 'react-native';
import { Fonts } from '@/shared/constants/themes';
import useSubmitPickup from '@/shared/services/mutations/pick/useSubmitPickup';
import useUploadState from '@/states/hooks/useUploadState';
import { useEffect, useState, useTransition } from 'react';
import usePickLocationState from '@/states/hooks/usePickLocationState';
import { useRouter } from 'expo-router';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useTakePhotoState from '@/states/hooks/useTakePhotoState';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';

export default function NoteForm() {
  const { colors } = useTheme();
  const [{ signFile }] = useSignState();
  const [{ photos }] = useUploadState();
  const { mutateAsync: submitForm, isPending, error } = useSubmitPickup();
  const [{ container_id }] = usePickLocationState();
  const [note, setNote] = useState('');
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [, setPhotos] = useTakePhotoState();

  const [, setOverlay] = useAppOverlayState();

  useEffect(() => {
    setOverlay((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending, setOverlay]);

  const handleSubmit = React.useCallback(() => {
    submitForm({
      container_id: container_id,
      message: note,
      image_urls: photos,
      signee: signFile,
    })
      .then((data) => {
        router.replace({
          pathname: `/pickup-result/${container_id}` as any,
          params: {
            type: 'success',
            message: note,
            page: 'pickup',
          },
        });
      })
      .catch((e) => {
        const reason = e.response.data.reason;
        toast(`${reason}`, {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          icon: '',
          styles: {
            pressable: {
              backgroundColor: colors.warn,
            },
          },
        });
      });
  }, [submitForm, container_id, note, photos, signFile, router, colors.warn]);

  const handleReset = React.useCallback(() => {
    startTransition(() => {
      setPhotos((pre) => ({ ...pre, photos: [] }));
    });
    router.replace(`/pick/${container_id}`);
  }, [container_id, router, setPhotos]);

  return (
    <Stack direction="column" gap={Spacing.SPACING_8}>
      <Typography weight="bold" color="black" fontSize={FontSize.FONT_SIZE_16}>
        Ghi chú
      </Typography>
      <Input
        onChange={(e) => setNote(e.nativeEvent.text)}
        textArea
        value={note}
        containerStyle={{
          borderWidth: 1,
          borderColor: colors.borderGray,
          height: Spacing.SPACING_99,
        }}
      />
      <Button
        onPress={isPending ? () => {} : handleSubmit}
        style={styles.btn}
        labelStyle={styles.btnLabel}
      >
        {isPending ? 'Đang thực hiện...' : 'Gửi'}
      </Button>
      <Stack
        style={{
          marginTop: Spacing.SPACING_8,
        }}
        className="justify-center"
      >
        <TouchableOpacity onPress={handleReset}>
          <Typography weight="bold" color="warn">
            Thực hiện lại
          </Typography>
        </TouchableOpacity>
      </Stack>
    </Stack>
  );
}

const styles = StyleSheet.create({
  btn: {
    marginTop: Spacing.SPACING_20,
    height: Spacing.SPACING_51,
    borderRadius: Spacing.SPACING_10,
    color: 'primary',
  },
  btnLabel: {
    textAlign: 'center',
    fontSize: FontSize.FONT_SIZE_16,
    color: 'white',
    fontFamily: Fonts.Bold,
  },
});
