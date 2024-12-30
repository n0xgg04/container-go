import { Spacing } from '@/shared/constants/spacing';
import React from 'react';
import { Card, Stack, Typography } from '@/shared/components/base';
import InfoLine from '../account/InfoLine';
import { useTheme } from '@/shared/hooks';
import FontSize from '@/shared/constants/font-scale';

interface PropsCardInfor extends $GetContainerDetailResponse {}

const CardInfor = React.memo(
  ({
    owner,
    contNo,
    distance,
    truckType,
    truckNumberPlate,
    sealNo,
    ...args
  }: PropsCardInfor) => {
    const { colors } = useTheme();

    return (
      <Card insetPadding={0} className="bg-white">
        <Stack
          style={{
            backgroundColor: colors.bgDarkEFE,
            padding: Spacing.SPACING_12,
          }}
        >
          <Typography
            color="black"
            fontSize={FontSize.FONT_SIZE_14}
            weight="bold"
            className="uppercase"
          >
            CHỦ HÀNG:{' '}
            <Typography color="textDarkGray" weight="bold" fontSize={14}>
              {owner}
            </Typography>{' '}
          </Typography>
        </Stack>
        <Stack
          direction="column"
          gap={Spacing.SPACING_8}
          style={{
            padding: Spacing.SPACING_12,
            paddingTop: Spacing.SPACING_10,
          }}
        >
          <InfoLine
            label="Container ID:  "
            value={`# ${contNo}/\n${args.type}/${sealNo}`}
          />
          <InfoLine
            label="Lộ trình:"
            value={`${distance ? distance : '-'} km`}
          />
          <InfoLine label="Phương tiện:" value={truckType} />
          <InfoLine label="Biển kiếm soát:" value={truckNumberPlate} />
        </Stack>
      </Card>
    );
  }
);

export default CardInfor;
