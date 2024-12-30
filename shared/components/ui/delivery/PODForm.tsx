import * as React from 'react';
import { Button, Stack } from '@/shared/components/base';
import usePodState from '@/states/hooks/usePODState';
import { Spacing } from '@/shared/constants/spacing';
import IconButton from '@/shared/components/base/IconButton';
import PlusIcon from '@/assets/images/svg/PlusIcon';
import { useTheme } from '@/shared/hooks';
import FileRow from '@/shared/components/ui/delivery/FileRow';
import { StyleSheet } from 'react-native';
import FontSize from '@/shared/constants/font-scale';
import { Fonts } from '@/shared/constants/themes';
import usePodUploadState from '@/states/hooks/usePODUploadState';
import * as FileSystem from 'expo-file-system';
import useUploadS3 from '@/shared/services/queries/home/useUploadS3';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';

const PodForm = React.memo(({ id }: { id: string }) => {
  const { colors } = useTheme();
  const [state, setState] = usePodState();
  const [, setUploadedFile] = usePodUploadState();
  const { mutateAsync: getUploadLink } = useUploadS3();
  const [, setOverlay] = useAppOverlayState();

  const handleAdd = React.useCallback(() => {
    setState((pre) => ({
      ...pre,
      file: [
        ...pre.file,
        {
          name: '',
          path: '',
        },
      ],
    }));
  }, [setState]);

  const uploadFiles = React.useCallback(
    async (file: string) => {
      if (!file) return Promise.resolve();
      const name = file.split('/');
      const r = await getUploadLink({
        fileType: 'CONFIRM_PICKUP',
        fileName: name[name.length - 1],
      });
      const upload = await FileSystem.uploadAsync(r.url, file, {
        httpMethod: 'PUT',
        uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
      });

      if (upload.status === 200) {
        setUploadedFile((pre) => ({
          ...pre,
          files: [...pre.files, r.filePath],
        }));
      } else {
      }
    },
    [getUploadLink, setUploadedFile]
  );

  const { mutate: upload, isPending: pendingUpload } = useMutation({
    mutationFn: async () =>
      Promise.all(state.file.map((file) => uploadFiles(file.path))).then(),
    mutationKey: ['UPLOAD_S3_files'],
    onSuccess: () => {
      router.replace(`/container_detail/${id}?action=submit&back=home` as any);
    },
  });

  const handleUpload = React.useCallback(() => {
    upload();
  }, [upload]);

  useEffect(() => {
    setOverlay((pre) => ({ ...pre, isLoading: pendingUpload }));
  }, [pendingUpload, setOverlay]);

  return (
    <Stack
      direction="column"
      className="w-full h-full"
      gap={Spacing.SPACING_12}
    >
      {state.file.map((item, index) => {
        return <FileRow key={item.name + index} id={index} name={item.name} />;
      })}
      <Stack direction="row" className="justify-center">
        <IconButton
          onPress={handleAdd}
          style={{
            backgroundColor: colors.primary,
          }}
          size={Spacing.SPACING_44}
        >
          <PlusIcon />
        </IconButton>
      </Stack>
      <Button
        onPress={handleUpload}
        style={styles.btn}
        labelStyle={styles.btnLabel}
      >
        {pendingUpload ? 'Đang xử lý...' : 'Tải lên'}
      </Button>
    </Stack>
  );
});

export default PodForm;

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
