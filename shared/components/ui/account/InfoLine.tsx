import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  icon?: React.ReactNode;
  label: string;
  value: string;
  labelWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  divide?: boolean;
};
export default function InfoLine({
  icon,
  label,
  value,
  labelWeight,
  divide = true,
}: Props) {
  return (
    <Stack
      direction="row"
      className="items-center w-full"
      gap={Spacing.SPACING_8}
      style={{
        justifyContent: divide ? undefined : 'space-between',
      }}
    >
      <Stack
        direction="row"
        gap={Spacing.SPACING_8}
        style={{
          width: divide ? '50%' : undefined,
        }}
        className="items-center overflow-hidden"
      >
        {icon}
        <Typography
          fontSize={FontSize.FONT_SIZE_14}
          color="textDarkGray"
          weight={labelWeight}
        >
          {label}
        </Typography>
      </Stack>
      <Typography fontSize={FontSize.FONT_SIZE_14} weight="bold" color="black">
        {value ? value : '-'}
      </Typography>
    </Stack>
  );
}
