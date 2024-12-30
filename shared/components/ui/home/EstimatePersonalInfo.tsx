import * as React from 'react';
import { Spacing } from '@/shared/constants/spacing';
import { Box, Stack, Typography } from '@/shared/components/base';
import IconButton from '@/shared/components/base/IconButton';
import LocationDarkIcon from '@/assets/images/svg/LocationDarkIcon';
import UserIcon2 from '@/assets/images/svg/UserIcon2';
import SmsIcon from '@/assets/images/svg/SmsIcon';
import PhoneIcon from '@/assets/images/svg/PhoneIcon';
import { useTheme } from '@/shared/hooks';
import { Linking, Platform } from 'react-native';
import FontSize from '@/shared/constants/font-scale';
import LocationNowIcon from '@/assets/images/svg/LocationNowIcon';
import { showLocation } from 'react-native-map-link';
import moment from 'moment';

type Props = {
  icon: React.ReactNode;
  label: React.ReactNode;
  address: string;
  name: string;
  phone: string;
  color: string;
  location?: {
    lat: number | string;
    lng: number | string;
  };
  date?: string;
};

const EstimatePersonalInfo = React.memo(
  ({ icon, name, label, address, phone, color, location, date }: Props) => {
    const { colors } = useTheme();
    const dateParsed = React.useMemo(
      () => moment(date).format('DD.MM.YYYY').toString(),
      []
    );
    const handleOpenMap = React.useCallback(() => {
      showLocation({
        latitude: location?.lat,
        longitude: location?.lng,
        title: '',
      }).then();
    }, [location?.lat, location?.lng]);

    const handlePhoneCall = () => {
      Linking.openURL(`tel:${phone}`);
    };

    const handleSMS = () => {
      const message = 'Xin chào!';

      const encodedMessage = encodeURIComponent(message);

      Linking.openURL(
        `sms:${phone}${Platform.OS === 'ios' ? '&' : '?'}body=${encodedMessage}`
      );
    };
    return (
      <Stack direction="column" gap={Spacing.SPACING_3}>
        <Stack className="flex flex-row items-center justify-between">
          <Stack
            gap={Spacing.SPACING_5}
            className="items-center justify-between"
          >
            <IconButton
              style={{
                backgroundColor: colors.buttonGray,
              }}
              size={Spacing.SPACING_40}
            >
              {icon}
            </IconButton>
            <Typography
              fontSize={FontSize.FONT_SIZE_14}
              className="text-gray-500"
            >
              {label}:{' '}
            </Typography>
            <Typography color={color} weight="bold">
              {dateParsed}
            </Typography>
          </Stack>
          <IconButton
            onPress={handleOpenMap}
            style={{
              backgroundColor: colors.buttonGray2,
            }}
            size={36}
          >
            <LocationNowIcon />
          </IconButton>
        </Stack>
        {address && (
          <Stack
            style={{
              marginTop: Spacing.SPACING_10,
            }}
            className="items-center"
          >
            <Box
              style={{
                width: Spacing.SPACING_36,
              }}
            >
              <LocationDarkIcon
                style={{
                  paddingHorizontal: Spacing.SPACING_20,
                }}
                className="mr-3"
              />
            </Box>
            <Typography
              fontSize={FontSize.FONT_SIZE_14}
              style={{
                marginLeft: Spacing.SPACING_5,
                flexShrink: 1,
              }}
              className="text-ellipsis"
              weight="bold"
              color="black"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {address}
            </Typography>
          </Stack>
        )}
        <Stack className="justify-between">
          <Stack className="flex flex-row items-center pt-2">
            <Box
              style={{
                width: Spacing.SPACING_36,
              }}
            >
              <UserIcon2
                style={{
                  paddingHorizontal: Spacing.SPACING_20,
                }}
                className="mr-3"
              />
            </Box>
            <Typography
              fontSize={FontSize.FONT_SIZE_14}
              className="text-ellipsis italic"
              numberOfLines={1}
              color={'textDarkGray'}
              ellipsizeMode="tail"
              style={{
                marginLeft: Spacing.SPACING_5,
                flexShrink: 1,
              }}
            >
              {name}
            </Typography>
          </Stack>
          <Stack className="items-center" gap={Spacing.SPACING_8}>
            <IconButton size={36} onPress={handleSMS}>
              <SmsIcon />
            </IconButton>
            <IconButton size={36} onPress={handlePhoneCall}>
              <PhoneIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    );
  }
);

export default EstimatePersonalInfo;
