import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import {
  GestureResponderEvent,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import ArrowDownIcon from '@/assets/images/svg/ArrowDownIcon';
import { Spacing } from '@/shared/constants/spacing';
import LocationIcon from '@/assets/images/svg/LocationIcon';
import { showLocation } from 'react-native-map-link';

type Props = {
  onMinimize: ((event: GestureResponderEvent) => void) | null | undefined;
  icon: React.ReactNode;
  title: string;
  color?: string;
  lat?: string | number;
  lng?: string | number;
};

const SheetHeader = React.memo(
  ({ onMinimize, title, icon, color = 'textGreen', lng, lat }: Props) => {
    const handleOpenMap = React.useCallback(() => {
      if (lat && lng)
        showLocation({
          latitude: lat,
          longitude: lng,
          title: '',
        }).then();
    }, [lat, lng]);

    return (
      <Stack className="justify-between">
        <Pressable onPress={onMinimize}>
          <ArrowDownIcon />
        </Pressable>
        <Stack className="items-center" gap={Spacing.SPACING_4}>
          {icon}
          <Typography weight="bold" color={color}>
            {title}
          </Typography>
        </Stack>
        <TouchableOpacity onPress={handleOpenMap}>
          <LocationIcon />
        </TouchableOpacity>
      </Stack>
    );
  }
);

export default SheetHeader;
