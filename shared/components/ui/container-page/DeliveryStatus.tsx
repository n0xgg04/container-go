import React from 'react';
import { Stack, Typography } from '../../base';
import { Spacing } from '@/shared/constants/spacing';
import IconButton from '../../base/IconButton';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PickupStateIcon from '@/assets/images/svg/PickupStateIcon';
import CircleInfoIconWarning from '@/assets/images/svg/CircleInfoIconWarning';
import ReceiveStateIcon from '../home/ReceiveStateIcon';
import DoneIconCircle from '@/assets/images/svg/DoneIconCircle';
import FailedIconCircle from '@/assets/images/svg/FailedIconCircle';
import moment from 'moment';
import FontSize from '@/shared/constants/font-scale';

interface PropsDeliveryStatus {
  status: 'Pickup' | 'Delivery';
  plannedDate: string;
  iconStatus?: string;
  pickStatus?: PICK_STATUS;
}

const DeliveryStatus = React.memo(
  ({
    status,
    plannedDate,
    iconStatus,
    pickStatus = 'WAITING',
  }: PropsDeliveryStatus) => {
    return (
      <Stack
        style={{
          paddingTop: Spacing.SPACING_16,
          alignItems: 'center',
          justifyContent: 'space-between',
          overflow: 'scroll',
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
              backgroundColor: Colors.buttonGray,
            }}
            size={Spacing.SPACING_40}
          >
            {status === 'Pickup' ? <PickupStateIcon /> : <ReceiveStateIcon />}
          </IconButton>
          <Typography
            color="textDarkGray"
            weight="bold"
            fontSize={FontSize.FONT_SIZE_18}
          >
            {status === 'Delivery' ? 'GIAO HÀNG' : 'LẤY HÀNG'}
          </Typography>
        </Stack>
        <Stack className="items-center">
          {pickStatus === 'WAITING' && (
            <Typography
              color={status === 'Delivery' ? 'textGreen' : 'textOceanBlue'}
              weight="bold"
              className="pr-2"
            >
              <Typography fontSize={FontSize.FONT_SIZE_14} color="textDarkGray">
                Dự kiến:{' '}
              </Typography>
              {moment(plannedDate).format('DD.MM.YYYY')}
            </Typography>
          )}
          {pickStatus === 'DONE' ? (
            <DoneIconCircle />
          ) : pickStatus === 'FAILED' ? (
            <FailedIconCircle />
          ) : (
            <CircleInfoIconWarning />
          )}
        </Stack>
        {/* <LocationNowIcon /> */}
      </Stack>
    );
  }
);

export default DeliveryStatus;
