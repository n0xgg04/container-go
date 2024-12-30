import React from 'react';
import { Box, Stack, Typography } from '../../base';
import { Spacing } from '@/shared/constants/spacing';
import LocationTarget from '@/assets/images/svg/LocationTarget';
import IconButton from '../../base/IconButton';
import LocaltionOceanBlue from '@/assets/images/svg/LocaltionOceanBlue';
import { IPCardDelivery } from './CardDelivery';
import { showLocation } from 'react-native-map-link';
import FontSize from '@/shared/constants/font-scale';

const LineAddress = React.memo(
  ({
    type,
    pickupAddress,
    dropoffAddress,
    location,
    fullPickupAddress,
  }: IPCardDelivery & { location?: $Geo }) => {
    const handleViewText = () => {
      const text = type === 'Pickup' ? fullPickupAddress : dropoffAddress;

      return text ? text : '-';
    };

    const handleOpenMap = React.useCallback(() => {
      if (location?.lat && location.lng)
        showLocation({
          latitude: location?.lat,
          longitude: location?.lng,
          title: '',
        }).then();
    }, [location?.lat, location?.lng]);

    return (
      <Stack
        style={{
          marginTop: Spacing.SPACING_10,
          alignItems: 'center',
        }}
      >
        <Box
          style={{
            width: Spacing.SPACING_20,
          }}
        >
          <LocationTarget />
        </Box>
        <Stack>
          <Typography fontSize={FontSize.FONT_SIZE_14} color="textDarkGray">
            Địa chỉ:{' '}
          </Typography>
        </Stack>
        <Stack
          className="grow"
          style={{
            flexShrink: 1,
          }}
        >
          <Typography
            fontSize={FontSize.FONT_SIZE_14}
            ellipsizeMode={'clip'}
            weight="bold"
            lineBreakMode={'clip'}
            color={'black'}
            style={{
              marginLeft: Spacing.SPACING_5,
              flexWrap: 'wrap',
              flexShrink: 1,
            }}
          >
            {handleViewText()}
          </Typography>
        </Stack>
        <Stack>
          <IconButton
            style={{
              flexShrink: 0,
              flex: 1,
            }}
            onPress={handleOpenMap}
            size={40}
          >
            <LocaltionOceanBlue />
          </IconButton>
        </Stack>
      </Stack>
    );
  }
);

export default LineAddress;
