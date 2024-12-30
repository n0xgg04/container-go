import React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import { Spacing } from '@/shared/constants/spacing';

interface CircleIconProps {
  size?: number;
  number?: number;
  color?: string;
  textColor?: string;
}

const CircleIcon: React.FC<CircleIconProps> = ({
  size = 24,
  number,
  color = '#FD5D57',
  textColor = 'white',
}) => {
  return (
    <Stack
      style={{
        backgroundColor: color,
        width: size,
        height: size,
        borderRadius: 999,
        marginBottom: Spacing.SPACING_3,
        marginLeft: Spacing.SPACING_3,
      }}
      className="justify-center items-center"
    >
      <Typography
        weight="bold"
        fontSize={FontSize.FONT_SIZE_12}
        style={{}}
        color="white"
      >
        {number}
      </Typography>
    </Stack>
  );
};

export default CircleIcon;
