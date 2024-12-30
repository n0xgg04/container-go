import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';

const CanPickUpForm = React.memo(() => {
  return (
    <Stack direction="column">
      <Typography weight="bold" color="textGray">
        Lý do
      </Typography>
    </Stack>
  );
});

export default CanPickUpForm;
