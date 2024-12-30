import * as React from 'react';
import { Stack, Typography } from '@/shared/components/base';
import { Pressable, StyleSheet } from 'react-native';
import { useTheme } from '@/shared/hooks';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  number?: number | string;
  label?: string;
  numberColor?: string;
};

const CardInformation = React.memo(({ label, number, numberColor }: Props) => {
  const { colors } = useTheme();
  // const router = useRouter();
  return (
    <Pressable
      onPress={() => {
        // router.push('/pick');
      }}
    >
      <Stack
        style={styles.card}
        direction="column"
        className="justify-center items-center"
      >
        <Typography
          weight="bold"
          style={{
            fontSize: FontSize.FONT_SIZE_28,
            color: numberColor,
          }}
        >
          {number}
        </Typography>
        <Typography
          weight="bold"
          style={{
            color: colors.textGray,
            fontSize: FontSize.FONT_SIZE_12,
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Pressable>
  );
});

export default CardInformation;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: Spacing.SPACING_8,
    borderRadius: Spacing.SPACING_8,
    minWidth: Spacing.SPACING_107,
    height: Spacing.SPACING_64,
    flexGrow: 1,
  },
});
