import * as React from 'react';
import { Stack } from '@/shared/components/base/Stack';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';

type Props = {
  insetPadding?: number;
  borderRadius?: number;
};

export function Card({
  children,
  insetPadding = Spacing.SPACING_20,
  className,
  style,
  borderRadius = Spacing.SPACING_8,
  ...props
}: React.PropsWithChildren<Props & React.ComponentProps<typeof Stack>>) {
  const { colors } = useTheme();

  return (
    <Stack
      style={[
        {
          padding: insetPadding,
          overflow: 'hidden',
          borderWidth: Spacing.SPACING_1 / 2,
          borderColor: colors.borderGray,
          borderRadius,
        },
        style,
      ]}
      direction="column"
      {...props}
    >
      {children}
    </Stack>
  );
}
