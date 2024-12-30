import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@/shared/components/base';
import { Image, ImageBackground } from 'expo-image';
import { IMAGES } from '@/shared/constants/assets';
import CenterBox from '@/shared/components/base/CenterBox';
import Input from '@/shared/components/base/Input';
import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import { useRouter } from 'expo-router';
import PhoneLoginIcon from '@/assets/images/svg/PhoneLoginIcon';
import { Fonts } from '@/shared/constants/themes';

type Props = {};

export default function SignInPhoneOtp() {
  const router = useRouter();
  const handleForgetPassword = () => {
    router.push('/forgot-password');
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Box style={styles.container}>
      <ImageBackground
        className="flex-1 w-full h-full absolute top-0 left-0 right-0 bottom-0"
        source={IMAGES.LOGIN.BACKGROUND}
      />
      <CenterBox className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
        <Stack direction="column" className="w-full items-center">
          <Image source={IMAGES.LOGIN.LOGO} style={styles.icon} />
          <Stack direction="column" className="p-5 w-full">
            <Box style={styles.inputGap}>
              <Typography className="w-full text-white">
                Nhập mã OTP
              </Typography>
              <Input
                containerStyle={[styles.inputGap, styles.shadow]}
                leftSection={<PhoneLoginIcon />}
                keyboardType = 'numeric'
              />
            </Box>
            <Box style={styles.inputGap}>
              <Button
                href="/(home)"
                style={[styles.btn, styles.loginBtn]}
                labelStyle={[styles.btnLabel, styles.btnLabelLogin]}
              >
                Đăng nhập
              </Button>
            </Box>
            <Box style={{marginTop: Spacing.SPACING_149}}>
              <Stack direction='column' gap={Spacing.SPACING_25} className='items-center'>
                <Button
                  href="/sign-in"
                  style={styles.btn}
                  labelStyle={styles.btnLabel}
                >
                  Đăng nhập bằng tài khoản
                </Button>
                <Pressable
                  onPress={handleForgetPassword}>
                  <Typography style={styles.btnForget}>
                    Quên mật khẩu?
                  </Typography>
                </Pressable>
              </Stack>
            </Box>
          </Stack>
        </Stack>
      </CenterBox>
    </Box>

    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  btnForget:{
    fontSize: FontSize.FONT_SIZE_14,
    color: 'white',
    textDecorationLine: 'underline',
    fontWeight: 'normal',
  },
  icon: {
    width: Spacing.SPACING_81,
    height: Spacing.SPACING_81,
  },
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  inputGap: {
    marginTop: Spacing.SPACING_10,
  },
  btnLabel:{
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
  },
  btnLogin: {
    width: Spacing.SPACING_180,
    height: Spacing.SPACING_21,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.16,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
