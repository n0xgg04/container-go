import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';

type Props = {
  size: number;
};

const IconButton = React.memo(function ({
  children,
  size = Spacing.SPACING_32,
  style,
  ...props
}: React.PropsWithChildren<
  React.ComponentProps<typeof TouchableOpacity> & Props
>) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={[
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          width: size,
          height: size,
          borderWidth: Spacing.SPACING_1,
          borderColor: colors.borderGray,
          borderRadius: Spacing.SPACING_4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
});

export default IconButton;
