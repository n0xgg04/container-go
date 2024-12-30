import * as React from 'react';
import { View } from 'moti';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';
import { ViewProps } from 'react-native';

export default function Divider({ style, ...props }: ViewProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          height: '100%',
          width: Spacing.SPACING_1,
          backgroundColor: theme.colors.borderGray,
        },
        style,
      ]}
      {...props}
    />
  );
}
