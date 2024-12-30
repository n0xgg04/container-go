import * as React from 'react';
import { Card, Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import Divider from '@/shared/components/base/Divider';
import { useTheme } from '@/shared/hooks';

type Props = {
  code: string;
  bks: string;
};

const TicketCode = React.memo(({ code, bks }: Props) => {
  const theme = useTheme();
  return (
    <Stack className="justify-center">
      <Card
        style={{
          height: 'auto',
          width: 'auto',
          paddingHorizontal: Spacing.SPACING_4,
          paddingVertical: Spacing.SPACING_2,
          backgroundColor: theme.colors.cardGray,
        }}
      >
        <Stack gap={Spacing.SPACING_10}>
          <Typography weight="bold" color="textGreen">
            <Typography color="textDarkGray" weight="bold">
              #
            </Typography>
            {code}
          </Typography>
          <Divider />
          <Typography weight="bold" color="primaryBlack">
            <Typography color="textDarkGray" weight="bold">
              BKS:{' '}
            </Typography>
            {bks}
          </Typography>
        </Stack>
      </Card>
    </Stack>
  );
});

export default TicketCode;
