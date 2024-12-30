import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import DoneIcon from '@/assets/images/svg/DoneIcon';
import FontSize from '@/shared/constants/font-scale';
import { useTheme } from '@/shared/hooks';

type Props = {
  icon?: React.ReactNode;
  label?: string;
  failed?: boolean;
};
export default function PickUpInfo({
  children,
  icon = <DoneIcon />,
  label = 'Đã lấy hàng :',
  failed = false,
}: React.PropsWithChildren<Props>) {
  const { colors } = useTheme();

  if (failed) {
    return (
      <Stack
        style={{
          backgroundColor: colors.tipBackground,
          paddingHorizontal: Spacing.SPACING_6,
          paddingVertical: Spacing.SPACING_2,
          borderRadius: Spacing.SPACING_2,
        }}
        gap={Spacing.SPACING_4}
        direction="column"
      >
        <Stack className="items-center">
          {icon}
          <Typography
            style={{
              marginLeft: Spacing.SPACING_4,
            }}
            fontSize={FontSize.FONT_SIZE_14}
            color="black"
          >
            <Typography
              weight="bold"
              fontSize={FontSize.FONT_SIZE_14}
              color="black"
            >
              {label}
            </Typography>{' '}
          </Typography>
        </Stack>
        <Typography
          style={{
            marginLeft: Spacing.SPACING_10,
          }}
          weight="bold"
          fontSize={FontSize.FONT_SIZE_14}
          color="textDarkGray"
        >
          {children}
        </Typography>
      </Stack>
    );
  }

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
      {icon}
      <Typography fontSize={FontSize.FONT_SIZE_14} color="black">
        <Typography
          weight="bold"
          fontSize={FontSize.FONT_SIZE_14}
          color="black"
        >
          {label}
        </Typography>{' '}
        <Typography
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
