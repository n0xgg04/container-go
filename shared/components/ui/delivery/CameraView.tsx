import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Camera, useCameraPermission } from 'react-native-vision-camera';
import { Stack, Typography } from '@/shared/components/base';
import { StyleSheet } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import Popup from '@/shared/components/common/Popup';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TakePhotoIcon from '@/assets/images/svg/TakePhotoIcon';
import { useTheme } from '@/shared/hooks';
import SimpleButton from '@/shared/components/base/SimpleButton';
import CameraZone from '@/shared/components/ui/take-photo/CameraZone';
import { useMutation } from '@tanstack/react-query';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import { useRouter } from 'expo-router';
import useUploadS3 from '@/shared/services/queries/home/useUploadS3';
import * as FileSystem from 'expo-file-system';
import useDeliveryTakePhotoState from '@/states/hooks/useDeliveryTakePhotoState';
import useDeliveryUploadS3 from '@/states/hooks/useDeliveryUploadS3';
import DeliveryPhotoList from '@/shared/components/ui/delivery/PhotoList';

const CameraView = React.memo(() => {
  const { colors } = useTheme();
  const { hasPermission, requestPermission } = useCameraPermission();
  const [forceReload, setForceReload] = React.useState(0);

  const [{ photos }, setPhoto] = useDeliveryTakePhotoState();
  const [{ photos: uploadedPhotos }, setUploadState] = useDeliveryUploadS3();
  const camera = useRef<Camera>(null);
  const router = useRouter();

  const { mutateAsync: getUploadLink } = useUploadS3();

  const uploadImage = React.useCallback(
    async (file: string) => {
      const name = file.split('/');
      const r = await getUploadLink({
        fileType: 'CONFIRM_PICKUP',
        fileName: name[name.length - 1],
      });
      const upload = await FileSystem.uploadAsync(r.url, 'file://' + file, {
        httpMethod: 'PUT',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });

      if (upload.status == 200) {
        setUploadState((pre) => ({
          ...pre,
          photos: [...uploadedPhotos, r.filePath],
        }));
      } else {
      }
    },
    [getUploadLink, setUploadState, uploadedPhotos]
  );

  const { mutate: handleUpload, isPending: pendingUpload } = useMutation({
    mutationFn: async () =>
      Promise.all(photos.map((photo) => uploadImage(photo))).then(),
    mutationKey: ['UPLOAD_S3_PHOTOS'],
    onSuccess: () => {
      router.push('/delivery/sign');
    },
  });

  const {
    mutate: takePhoto,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      return camera.current?.takeSnapshot();
    },
    onSuccess: (data) => {
      if (data?.path) {
        setPhoto((state) => ({
          ...state,
          photos: [...photos, data?.path],
        }));
      } else {
        toast('Chụp ảnh bị lỗi!', {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          icon: '',
          styles: {
            pressable: {
              backgroundColor: colors.warn,
            },
          },
        });
      }
    },
  });

  useEffect(() => {
    if (isError) {
      toast('Chụp ảnh bị lỗi!', {
        duration: 4000,
        position: ToastPosition.BOTTOM,
        icon: '',
        styles: {
          pressable: {
            backgroundColor: colors.warn,
          },
        },
      });
      console.error(error);
    }
  }, [isError]);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().then((r) => {
        setForceReload((pre) => pre + 1);
      });
    }
  }, [hasPermission, requestPermission]);

  return (
    <Stack direction="column" className="items-center" gap={Spacing.SPACING_16}>
      {!hasPermission && (
        <Popup
          visible={true}
          title="Cần có quyền truy cập Camera"
          onClose={requestPermission}
        />
      )}
      <CameraZone key={forceReload} isLoading={isPending} camRef={camera} />
      <TouchableOpacity
        onPress={() => takePhoto()}
        style={[
          styles.camBtn,
          {
            backgroundColor: colors.borderGray,
            opacity: isPending ? 0.4 : 1,
          },
        ]}
        disabled={isPending}
      >
        <TakePhotoIcon />
      </TouchableOpacity>
      <DeliveryPhotoList />
      <SimpleButton
        onPress={
          pendingUpload
            ? () => {}
            : () => {
                handleUpload();
              }
        }
        containerStyle={[
          styles.nextBtn,
          {
            opacity: isPending ? 0.4 : 1,
          },
        ]}
        style={[styles.nextBtnStyle]}
        disabled={isPending}
        bgColor="primary"
        labelColor="white"
      >
        <Typography weight="bold">
          {pendingUpload ? 'Đang tải ảnh...' : 'Xác nhận ảnh'}
        </Typography>
      </SimpleButton>
    </Stack>
  );
});

export default CameraView;

const styles = StyleSheet.create({
  camBtn: {
    borderRadius: 999,
    width: Spacing.SPACING_63,
    height: Spacing.SPACING_63,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtn: {
    borderRadius: Spacing.SPACING_8,
    width: '100%',
  },
  nextBtnStyle: {
    width: '100%',
    height: Spacing.SPACING_51,
  },
});
