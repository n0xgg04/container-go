import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import Input from '@/shared/components/base/Input';
import { useTheme } from '@/shared/hooks';
import useSignState from '@/states/hooks/useSignState';
import { Spacing } from '@/shared/constants/spacing';

export default function SenderInfo() {
  const { colors } = useTheme();
  const [{ sender_name }] = useSignState();
  return (
    <Stack direction="column" gap={Spacing.SPACING_8}>
      <Typography weight="bold" color="black" fontSize={FontSize.FONT_SIZE_16}>
        Người gửi
      </Typography>
      <Input
        readOnly
        value={sender_name}
        containerStyle={{
          borderWidth: 1,
          borderColor: colors.borderGray,
        }}
      />
    </Stack>
  );
}
