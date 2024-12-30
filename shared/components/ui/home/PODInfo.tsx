import React from 'react';
import { Stack, Typography } from '../../base';
import { Spacing } from '@/shared/constants/spacing';
import IconButton from '../../base/IconButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SearchGreen from '@/assets/images/svg/SearchGreen';

const PODInfo = () => {
  return (
    <Stack
      gap={Spacing.SPACING_5}
      style={{
        alignItems: 'center',
        marginVertical: 20,
      }}
    >
      <IconButton
        style={{
          backgroundColor: Colors.buttonGray,
        }}
        size={40}
      >
        <SearchGreen />
        {/* {status === 'Delivery' ? <PickupStateIcon /> : <ReceiveStateIcon />} */}
      </IconButton>
      <Typography
        color="textDarkGray"
        weight="bold"
        fontSize={18}
        style={{ textTransform: 'uppercase' }}
      >
        Tài liệu POD
      </Typography>
    </Stack>
  );
};

export default PODInfo;
