import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Spacing } from '@/shared/constants/spacing';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontSize from '@/shared/constants/font-scale';
import { useTheme } from '@/shared/hooks';
import { useRouter } from 'expo-router';
import { SummariesStatus } from '@/shared/constants/deliver_status.enum';

type Props = {
  icon: React.ReactNode;
  label?: string;
  amount?: string | number;
  color?: string;
  fid?: string;
};

export default function DeliverCard({
  icon,
  amount,
  label,
  color,
  fid,
}: Props) {
  const { colors } = useTheme();
  const router = useRouter();

  const handleGoContainer = React.useCallback(() => {
    router.replace({
      pathname: '/container',
      params: {
        id: 1,
        name: SummariesStatus.NOT_STARTED,
        fid,
      },
    });
  }, [fid, router]);
  return (
    <TouchableOpacity onPress={handleGoContainer}>
      <Stack
        style={[
          styles.container,
          {
            borderColor: colors.borderGray,
            borderWidth: 1,
            backgroundColor: colors.white,
            borderRadius: Spacing.SPACING_12,
            height: Spacing.SPACING_82,
          },
        ]}
        className="items-center justify-between"
      >
        <Stack gap={Spacing.SPACING_8} className="items-center">
          {icon}
          <Typography
            fontSize={FontSize.FONT_SIZE_18}
            weight="bold"
            color="black"
          >
            {label}
          </Typography>
        </Stack>
        <Typography
          weight="bold"
          fontSize={FontSize.FONT_SIZE_28}
          style={{
            color,
          }}
        >
          {amount}
        </Typography>
      </Stack>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.SPACING_24,
  },
});
