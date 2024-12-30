import * as React from 'react';
import { Card, Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import Location2Icon from '@/assets/images/svg/Location2Icon';
import User2Icon from '@/assets/images/svg/User2Icon';
import { useTheme } from '@/shared/hooks';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  location: string;
  pickup_location: string;
  sender_name: string;
  deliver?: boolean;
};

const TicketDetail = React.memo(
  ({ location, pickup_location, sender_name, deliver = false }: Props) => {
    const theme = useTheme();
    return (
      <Card
        style={{
          backgroundColor: theme.colors.cardGray,
          paddingVertical: Spacing.SPACING_12,
        }}
      >
        <Stack direction="column" gap={Spacing.SPACING_4}>
          <Typography color="primaryBlack">{location}</Typography>
          <Stack className="items-center" gap={Spacing.SPACING_2}>
            <Location2Icon />
            <Typography fontSize={FontSize.FONT_SIZE_14} color="primaryBlack">
              {deliver ? 'Vị trí lấy hàng' : 'Địa chỉ'}:{' '}
              <Typography
                fontSize={FontSize.FONT_SIZE_14}
                color="primaryBlack"
                weight="bold"
                numberOfLines={2}
              >
                {pickup_location}
              </Typography>
            </Typography>
          </Stack>
          <Stack className="items-center" gap={Spacing.SPACING_2}>
            <User2Icon />
            <Typography fontSize={FontSize.FONT_SIZE_14} color="primaryBlack">
              {deliver ? 'Người gửi' : 'Người nhận'} :{' '}
              <Typography
                fontSize={FontSize.FONT_SIZE_14}
                color="primaryBlack"
                weight="bold"
              >
                {sender_name}
              </Typography>
            </Typography>
          </Stack>
        </Stack>
      </Card>
    );
  }
);

export default TicketDetail;
