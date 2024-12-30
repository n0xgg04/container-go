import * as React from 'react';
import { Card, Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import InfoLine from '@/shared/components/ui/account/InfoLine';
import useDriverInfoState from '@/states/hooks/useDriverInfoState';
import moment from 'moment';

const DriverInfo = React.memo(() => {
  const [
    { drivingLicenseLevel, drivingLicenseNumber, drivingLicenseExpiryDate },
  ] = useDriverInfoState();
  return (
    <Stack direction="column" gap={Spacing.SPACING_10}>
      <Typography
        fontSize={FontSize.FONT_SIZE_14}
        weight="bold"
        color="textDarkGray"
      >
        Giấy phép lái xe
      </Typography>
      <Card insetPadding={Spacing.SPACING_12}>
        <Card.CardHeader>
          <Stack direction="column" gap={Spacing.SPACING_8}>
            <InfoLine divide={false} label="Hạng" value={drivingLicenseLevel} />
            <InfoLine
              divide={false}
              label="Số giấy phép"
              value={drivingLicenseNumber}
            />
            <InfoLine
              divide={false}
              label="Ngày hết hạn"
              value={
                drivingLicenseExpiryDate != '-'
                  ? moment(drivingLicenseExpiryDate).format('DD/MM/YYYY')
                  : '-'
              }
            />
          </Stack>
        </Card.CardHeader>
      </Card>
    </Stack>
  );
});

export default DriverInfo;
