import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import DoneIcon from '@/assets/images/svg/DoneIcon';
import FontSize from '@/shared/constants/font-scale';
import { useTheme } from '@/shared/hooks';

const SignInfo = React.memo(
  ({
    children,
    title = 'Đã ký',
  }: React.PropsWithChildren<{
    title?: string;
  }>) => {
    const { colors } = useTheme();
    return (
      <Stack
        style={{
          backgroundColor: colors.tipBackground,
          paddingHorizontal: Spacing.SPACING_6,
          paddingVertical: Spacing.SPACING_2,
          borderRadius: Spacing.SPACING_2,
        }}
        gap={Spacing.SPACING_4}
        className="items-center"
      >
        <DoneIcon />
        <Typography fontSize={FontSize.FONT_SIZE_14} color="black">
          <Typography
            weight="bold"
            fontSize={FontSize.FONT_SIZE_14}
            color="black"
          >
            {title} :
          </Typography>{' '}
          <Typography
            numberOfLines={2}
            weight="bold"
            fontSize={FontSize.FONT_SIZE_14}
            color="textDarkGray"
          >
            {children}
          </Typography>
        </Typography>
      </Stack>
    );
  }
);

export default SignInfo;
