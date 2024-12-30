import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import RateRowInfo from '@/shared/components/ui/account/RateRowInfo';
import FontSize from '@/shared/constants/font-scale';
import RateStarIcon from '@/assets/images/svg/RateStarIcon';

const RatingInfo = React.memo(() => {
  return (
    <Stack direction="column" gap={Spacing.SPACING_8}>
      <Stack className="justify-center" gap={Spacing.SPACING_8}>
        <RateRowInfo value={4.5} label="Thái độ phục vụ" />
        <RateRowInfo value={4.5} label="Đúng hẹn" border />
        <RateRowInfo value={4.5} label="Tiêu chí" border />
      </Stack>
      <Stack
        direction="column"
        className="justify-center items-center"
        gap={Spacing.SPACING_10}
      >
        <Typography fontSize={FontSize.FONT_SIZE_14} color="textDarkGray">
          Điểm đánh giá
        </Typography>
        <RateStarIcon />
        <Typography
          weight="bold"
          fontSize={FontSize.FONT_SIZE_36}
          color="textGreen"
        >
          4.1
        </Typography>
      </Stack>
    </Stack>
  );
});

export default RatingInfo;
