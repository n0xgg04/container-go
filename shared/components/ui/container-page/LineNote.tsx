import React from 'react';
import { Box, Stack, Typography } from '../../base';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';
import NoteIcon from '@/assets/images/svg/NoteIcon';
import { IPCardDelivery } from './CardDelivery';

const LineNote = React.memo(
  ({ type, pickupNote, deliveryNote }: IPCardDelivery) => {
    const { colors } = useTheme();
    return (
      <Stack
        style={{
          marginTop: Spacing.SPACING_10,
        }}
        direction="column"
      >
        <Stack className="flex flex-row items-center">
          {/* /LocationTarget */}
          <Box
            style={{
              width: Spacing.SPACING_20,
            }}
          >
            <NoteIcon style={{}} />
          </Box>
          <Typography
            color="textDarkGray"
            numberOfLines={3}
            weight="bold"
            fontSize={14}
          >
            Ghi chú:{' '}
          </Typography>
        </Stack>
        <Stack
          className={`items-center border-[1px] rounded-md border-gray-200 h-16 mt-2`}
          gap={Spacing.SPACING_8}
          style={{
            backgroundColor: colors.cardGray,
            padding: Spacing.SPACING_10,
          }}
        >
          <Typography
            numberOfLines={1}
            weight="bold"
            color={'black'}
            // ellipsizeMode="tail"
            style={{
              flexShrink: 1,
            }}
          >
            {type === 'Delivery' ? deliveryNote : pickupNote}
          </Typography>
        </Stack>
      </Stack>
    );
  }
);

export default LineNote;
