import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { Card, Stack, Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import { useTheme } from '@/shared/hooks';

type Props = {
  message: string;
  subtitle: string;
  icon: React.ReactNode;
  type: 'error' | 'success';
};

const NoticeCard = React.memo(({ message, subtitle, icon, type }: Props) => {
  const { colors } = useTheme();
  return (
    <Card
      insetPadding={Spacing.SPACING_16}
      style={{
        borderColor: type === 'error' ? colors.warn : colors.successBorder,
        borderWidth: Spacing.SPACING_1,
        backgroundColor:
          type === 'error' ? '#FFF3F2' : colors.successBackground,
      }}
    >
      <Stack gap={Spacing.SPACING_10} direction="row" className="items-center">
        {icon}
        <Stack direction="column">
          <Typography weight="bold" color="black">
            {message}
          </Typography>
          <Typography fontSize={FontSize.FONT_SIZE_12} color="black">
            {subtitle}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
});

export default NoticeCard;
