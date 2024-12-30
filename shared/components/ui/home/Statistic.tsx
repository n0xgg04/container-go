import * as React from 'react';
import { Box, Stack, Typography } from '@/shared/components/base';
import { StyleSheet } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';
import DeliverInformation from '@/shared/components/ui/home/DeliverInformation';
import DropdownDashboard from '@/shared/components/ui/home/DropdownDashboard';

const Statistic = React.memo(() => {
  const theme = useTheme();

  return (
    <Box style={styles.mainBox} bgColor={theme.colors.mainBackground}>
      <Stack direction="column" gap={Spacing.SPACING_20}>
        <Stack
          gap={Spacing.SPACING_10}
          className="items-center justify-between"
        >
          <Typography weight="bold" color="textDarkGray">
            Thống kê theo
          </Typography>
          <DropdownDashboard />
        </Stack>
        <DeliverInformation />
      </Stack>
    </Box>
  );
});

Statistic.displayName = 'Statistic';

export default Statistic;

const styles = StyleSheet.create({
  mainBox: {
    borderTopRightRadius: Spacing.SPACING_24,
    borderTopLeftRadius: Spacing.SPACING_24,
  },
});
