import * as React from 'react';
import { Typography } from '@/shared/components/base';
import { Pressable, StyleSheet, View } from 'react-native';
import FontSize from '@/shared/constants/font-scale';
import { Spacing } from '@/shared/constants/spacing';

type Props = {
  handleForgetPassword: () => void;
};
const ForgotPasswordBtn = React.memo(({ handleForgetPassword }: Props) => {
  return (
    <Pressable
      style={{
        flexDirection: 'column',
      }}
      onPress={handleForgetPassword}
    >
      <Typography fontSize={FontSize.FONT_SIZE_14} style={styles.btnForget}>
        Quên mật khẩu?
      </Typography>
      <View
        style={{
          marginTop: Spacing.SPACING_2,
          height: Spacing.SPACING_1,
          backgroundColor: 'white',
        }}
      />
    </Pressable>
  );
});

export default ForgotPasswordBtn;

const styles = StyleSheet.create({
  btnForget: {
    fontSize: FontSize.FONT_SIZE_14,
    color: 'white',
    textDecorationStyle: 'solid',
    fontWeight: '400',
  },
});
