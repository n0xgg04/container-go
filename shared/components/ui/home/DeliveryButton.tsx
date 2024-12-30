import * as React from 'react';
import ShippingWhiteIcon from '@/assets/images/svg/ShippingWhiteIcon';
import { Typography } from '@/shared/components/base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import { useTheme } from '@/shared/hooks';
import FontSize from '@/shared/constants/font-scale';

type Props = {
  onPress?: () => void;
};
const DeliveryButton = React.memo(({ onPress }: Props) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.buttonBackground,
        },
        styles.btn,
      ]}
    >
      <ShippingWhiteIcon />
      <Typography fontSize={FontSize.FONT_SIZE_12} color="white" weight="bold">
        Vận chuyển
      </Typography>
    </TouchableOpacity>
  );
});

export default DeliveryButton;

const styles = StyleSheet.create({
  btn: {
    height: Spacing.SPACING_43,
    borderRadius: Spacing.SPACING_8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.SPACING_5,
    marginTop: Spacing.SPACING_20,
  },
});
