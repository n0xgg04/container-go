import * as React from 'react';
import { useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from '@/shared/components/base';
import { AnimatePresence, SafeAreaView } from 'moti';
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
import { phoneValidator } from '@/shared/validators/phone.z';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import usePhone from '@/shared/services/mutations/auth/usePhone';
import Popup from '@/shared/components/common/Popup';

type Props = {};

type FormInputs = {
  phone: string;
};

export default function SignInPhone() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(phoneValidator),
  });
  const { mutate, isPending, isSuccess, isError, reset } = usePhone();
  const onSubmit = (values: FormInputs) => {
    mutate({
      phone: values.phone,
    });
  }
  const handleForgetPassword = () => {
    router.push('/forgot-password');
  }
  useEffect(() => {
    if (isSuccess) {
      router.replace('/sign-in-phone-otp');
    }
  }, [isSuccess, router]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Box style={styles.container}>
        <AnimatePresence exitBeforeEnter>
          {isError && (
            <Popup
              onClose={reset}
              visible={!isSuccess}
              title="Vui lòng kiểm tra lại số điện thoại!"
            />
          )}
        </AnimatePresence>
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
                    Số điện thoại
                  </Typography>
                  {errors.phone?.message && (
                      <Typography fontSize={FontSize.FONT_SIZE_14} color="warn">
                        {errors.phone.message}
                      </Typography>
                  )}
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Input
                          autoCapitalize="none"
                          onBlur={onBlur}
                          onChange={(e) => {
                            setValue('phone', e.nativeEvent.text);
                          }}
                          value={value}
                          containerStyle={[styles.inputGap, styles.shadow]}
                          leftSection={<PhoneLoginIcon />}
                          keyboardType = 'numeric'
                        />
                    )}
                    name="phone"
                    rules={{ required: 'Số điện thoại không được để trống' }}
                    defaultValue=""
                  />
                </Box>
                <Box style={styles.inputGap}>
                  <Button
                    onPress={handleSubmit(onSubmit)}
                    href="/sign-in-phone-otp"
                    style={[styles.btn, styles.loginBtn]}
                    labelStyle={[styles.btnLabel, styles.btnLabelLogin]}
                    disabled={isPending}
                  >
                    {isPending ? 'Đang xử lý...' : 'Đăng nhập'}
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
