import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { Stack, Typography } from '@/shared/components/base';
import IconButton from '@/shared/components/base/IconButton';
import PickupStateIcon from '@/assets/images/svg/PickupStateIcon';
import { useTheme } from '@/shared/hooks';
import { useMemo } from 'react';
import moment from 'moment';
import FontSize from '@/shared/constants/font-scale';
import LocationNowIcon from '@/assets/images/svg/LocationNowIcon';
import { showLocation } from 'react-native-map-link';

type Props = {
  date: string;
  location?: {
    lat?: string | number;
    lng?: string | number;
  };
};
const PickupInfo = React.memo(({ date, location }: Props) => {
  const { colors } = useTheme();
  const parsedData = useMemo(
    () => moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY'),
    [date]
  );

  const handleOpenMap = React.useCallback(() => {
    showLocation({
      latitude: location?.lat,
      longitude: location?.lng,
      title: '',
    }).then();
  }, []);

  return (
    <Stack
      style={{
        paddingTop: Spacing.SPACING_16,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Stack
        gap={Spacing.SPACING_5}
        style={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <IconButton
          style={{
            backgroundColor: colors.buttonGray,
          }}
          size={40}
        >
          <PickupStateIcon />
        </IconButton>
        <Typography fontSize={FontSize.FONT_SIZE_14} color="textGray">
          LẤY HÀNG:{' '}
        </Typography>
        <Typography color="textGreen" weight="bold">
          {parsedData}
        </Typography>
      </Stack>
      <IconButton
        onPress={handleOpenMap}
        style={{
          backgroundColor: colors.buttonGray2,
        }}
        size={40}
      >
        <LocationNowIcon />
      </IconButton>
    </Stack>
  );
});

export default PickupInfo;
