import * as React from 'react';
import { Box, Button } from '@/shared/components/base';
import { StyleSheet } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import { Fonts } from '@/shared/constants/themes';

type Props = {
  handleSubmit: () => void;
  isPending: boolean;
};
const LoginButton = React.memo(({ handleSubmit, isPending }: Props) => {
  return (
    <Box style={styles.inputGap}>
      <Button
        onPress={handleSubmit}
        style={[styles.btn, styles.loginBtn]}
        labelStyle={[styles.btnLabel, styles.btnLabelLogin]}
        disabled={isPending}
      >
        {isPending ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </Button>
    </Box>
  );
});

export default LoginButton;

const styles = StyleSheet.create({
  inputGap: {
    marginTop: Spacing.SPACING_12,
    // height: Spacing.SPACING_10,
  },
  btnLabel: {
    textAlign: 'center',
    fontSize: FontSize.FONT_SIZE_16,
    color: 'white',
  },
  btnLabelLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: FontSize.FONT_SIZE_16,
    color: 'white',
    fontFamily: Fonts.Bold,
  },
  loginBtn: {
    height: Spacing.SPACING_60,
  },
  btn: {
    marginTop: Spacing.SPACING_20,
    height: Spacing.SPACING_40,
    borderRadius: Spacing.SPACING_10,
    color: 'primary',
  },
  btnLogin: {
    width: Spacing.SPACING_180,
    height: Spacing.SPACING_21,
  },
});
