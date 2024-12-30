import * as React from 'react';
import { Card, Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import IconButton from '@/shared/components/base/IconButton';
import UploadIcon from '@/assets/images/svg/UploadIcon';
import * as DocumentPicker from 'expo-document-picker';
import usePodState from '@/states/hooks/usePODState';

type Props = {
  name: string;
  id: number;
};

const FileRow = React.memo(({ name, id }: Props) => {
  const [state, setState] = usePodState();

  const handlePick = React.useCallback(async () => {
    const pick = await DocumentPicker.getDocumentAsync({
      multiple: false,
      type: ['image/*', 'application/pdf'],
    });
    if (!pick.canceled) {
      const newArr = [...state.file];
      newArr[id] = {
        name: pick.assets[0].name,
        path: pick.assets[0].uri,
      };
      setState((pre) => ({ ...pre, file: newArr }));
    }
  }, [id, setState, state.file]);

  return (
    <Stack className="w-full items-center" gap={Spacing.SPACING_8}>
      <Card
        style={{
          height: Spacing.SPACING_44,
          maxWidth: Spacing.SPACING_300,
        }}
        insetPadding={Spacing.SPACING_4}
        className="grow"
      >
        <Stack className="items-center h-full">
          <Typography numberOfLines={1} ellipsizeMode="clip" color="black">
            {name}
          </Typography>
        </Stack>
      </Card>
      <IconButton onPress={handlePick} size={Spacing.SPACING_44}>
        <UploadIcon />
      </IconButton>
    </Stack>
  );
});

export default FileRow;
