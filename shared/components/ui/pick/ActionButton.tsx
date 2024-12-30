import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  icon: React.ReactNode;
  label: string;
};
export default function ActionButton({ icon, label }: Props) {
  return (
    <Stack
      direction="column"
      gap={Spacing.SPACING_4}
      style={{
        width: Spacing.SPACING_122,
      }}
      className="justify-center items-center"
    >
      {icon}
      <Typography fontSize={FontSize.FONT_SIZE_12} color="primaryBlack">
        {label}
      </Typography>
    </Stack>
  );
}
