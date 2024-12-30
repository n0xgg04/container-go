import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { Stack, Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import { useTheme } from '@/shared/hooks';

type Props = {
  label: string;
  value: number;
  border?: boolean;
};
export default function RateRowInfo({ label, value, border = false }: Props) {
  const theme = useTheme();
  return (
    <Stack
      direction="column"
      gap={Spacing.SPACING_8}
      className="items-center flex-1"
      style={{
        borderLeftWidth: border ? 1 : 0,
        borderLeftColor: theme.colors.borderGray,
      }}
    >
      <Typography
        fontSize={FontSize.FONT_SIZE_14}
        color="textDarkGray"
        weight="bold"
        className="text-center"
      >
        {label}
      </Typography>
      <Typography weight="bold" fontSize={FontSize.FONT_SIZE_20} color="black">
        {value}
      </Typography>
    </Stack>
  );
}
