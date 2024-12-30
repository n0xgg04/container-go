import * as React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native-gesture-handler';
import { Typography } from '@/shared/components/base/Typography';
import { useTheme } from '@/shared/hooks';
import { Spacing } from '@/shared/constants/spacing';

type Props = {
  labelColor?: string;
  bgColor?: string;
  labelStyle?: React.ComponentProps<typeof Typography>['style'];
} & TouchableOpacityProps;
const SimpleButton = React.memo(
  ({ children, bgColor, labelStyle, labelColor, style, ...props }: Props) => {
    const { colors } = useTheme();
    const bg = React.useMemo(
      () =>
        bgColor && Object.keys(colors).includes(bgColor)
          ? colors[bgColor as keyof typeof colors]
          : 'transparent',
      [bgColor, colors]
    );
    return (
      <TouchableOpacity
        style={[
          {
            backgroundColor: bg,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: Spacing.SPACING_41,
            borderRadius: Spacing.SPACING_4,
          },
          style,
        ]}
        {...props}
      >
        <Typography
          weight="bold"
          style={[
            {
              color:
                labelColor && Object.keys(colors).includes(labelColor)
                  ? colors[labelColor as keyof typeof colors]
                  : 'transparent',
            },
            labelStyle,
          ]}
        >
          {children}
        </Typography>
      </TouchableOpacity>
    );
  }
);

export default SimpleButton;
