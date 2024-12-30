import React from 'react';
import { Box, Stack, Typography } from '../../base';
import { Spacing } from '@/shared/constants/spacing';
import UserIcon2 from '@/assets/images/svg/UserIcon2';
import IconButton from '../../base/IconButton';
import SmsIcon from '@/assets/images/svg/SmsIcon';
import PhoneIcon from '@/assets/images/svg/PhoneIcon';
import { IPCardDelivery } from './CardDelivery';
import { Linking, Platform } from 'react-native';
import FontSize from '@/shared/constants/font-scale';

const LineReceiver = React.memo(
  ({
    type,
    dropoffContact,
    pickupContact,
    pickupContactPhone,
    dropoffContactPhone,
  }: IPCardDelivery) => {
    const handlePhoneCall = () => {
      const phoneNumber =
        type === 'Delivery' ? dropoffContactPhone : pickupContactPhone;
      Linking.openURL(`tel:${phoneNumber}`);
    };

    const handleSMS = () => {
      const phoneNumber =
        type === 'Delivery' ? dropoffContactPhone : pickupContactPhone;
      const message = 'Xin chào!'; // Tin nhắn mặc định (tùy chọn)

      // Mã hóa tin nhắn để sử dụng trong URL
      const encodedMessage = encodeURIComponent(message);

      Linking.openURL(
        `sms:${phoneNumber}${Platform.OS === 'ios' ? '&' : '?'}body=${encodedMessage}`
      );
    };

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
          <UserIcon2 style={{}} className="mr-3" />
        </Box>
        <Typography fontSize={FontSize.FONT_SIZE_14} color="textDarkGray">
          Người {type === 'Delivery' ? 'nhận' : 'gửi'}:{' '}
        </Typography>
        <Typography
          fontSize={FontSize.FONT_SIZE_14}
          numberOfLines={2}
          weight="bold"
          color={'black'}
          // ellipsizeMode="tail"
          style={{
            flexGrow: 1,
            marginLeft: Spacing.SPACING_5,
            flexShrink: 1,
          }}
        >
          {type === 'Delivery' ? dropoffContact : pickupContact}
        </Typography>
        <Stack className="items-center" gap={Spacing.SPACING_8}>
          <IconButton size={40} onPress={handleSMS}>
            <SmsIcon />
          </IconButton>
          <IconButton size={40} onPress={handlePhoneCall}>
            <PhoneIcon />
          </IconButton>
        </Stack>
      </Stack>
    );
  }
);

export default LineReceiver;
