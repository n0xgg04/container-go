import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { Stack, Typography } from '@/shared/components/base';
import LocationCardIcon from '@/assets/images/svg/LocationCardIcon';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  address: string;
};
const PickupAddress = React.memo(({ address }: Props) => {
  return (
    <Stack
      style={{
        marginTop: Spacing.SPACING_12,
      }}
      className="items-center"
    >
      <LocationCardIcon
        style={{
          marginRight: Spacing.SPACING_10,
        }}
      />
      <Typography
        fontSize={FontSize.FONT_SIZE_14}
        color="textGray"
        className="text-ellipsis"
        weight="bold"
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{ flexShrink: 1 }}
      >
        {address}
      </Typography>
    </Stack>
  );
});

export default PickupAddress;
