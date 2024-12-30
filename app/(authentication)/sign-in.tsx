import * as React from 'react';
import { Box, Stack } from '@/shared/components/base';
import { Image, ImageBackground } from 'expo-image';
import { IMAGES } from '@/shared/constants/assets';
import CenterBox from '@/shared/components/base/CenterBox';
import LockIcon from '@/assets/images/svg/LockIcon';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import { useRouter } from 'expo-router';
import useAuth from '@/shared/services/mutations/auth/useAuth';
import { useForm } from 'react-hook-form';
import loginValidator from '@/shared/validators/login.z';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';
import PopupNotice from '@/shared/components/ui/login/PopupNotice';
import ForgotPasswordBtn from '@/shared/components/ui/login/ForgotPasswordBtn';
import LoginInputField from '@/shared/components/ui/login/LoginInputField';
import UserIcon from '@/assets/images/svg/UserIcon';
import LoginButton from '@/shared/components/ui/login/LoginButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS } from '@/shared/constants/async-storage-key';

type FormInputs = {
  username: string;
  password: string;
};

const SignIn = React.memo(() => {
  const router = useRouter();
  const handleForgetPassword = () => {
    router.push('/forgot-password');
  };
  const { login, isPending, isSuccess, isError, reset } = useAuth();
  const [, setOverlayState] = useAppOverlayState();

  useEffect(() => {
    setOverlayState((pre) => ({ ...pre, isLoading: isPending }));
  }, [isPending]);

  useEffect(() => {
    if (isSuccess) {
      router.replace('/');
    }
  }, [isSuccess, router]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(loginValidator),
  });

  useEffect(() => {
    AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER).then((old) => {
      if (old) setValue('username', old);
    });
  }, [setValue]);

  const onSubmit = (values: FormInputs) => {
    login({
      username: values.username,
      password: values.password,
      rememberMe: true,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        // Thực hiện hành động khi bàn phím mở
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // Thực hiện hành động khi bàn phím đóng
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={'height'}
        enabled={false}
        style={{ flex: 1 }}
      >
        <Box style={styles.container}>
          <PopupNotice isSuccess={isSuccess} isError={isError} reset={reset} />
          <ImageBackground
            className="flex-1 w-full h-full absolute top-0 left-0 right-0 bottom-0"
            source={IMAGES.LOGIN.BACKGROUND}
          />
          <CenterBox className="w-full h-full absolute top-0 left-0 right-0 bottom-0">
            <Stack direction="column" className="w-full items-center">
              <Image source={IMAGES.LOGIN.LOGO} style={styles.icon} />
              <Stack direction="column" className="p-5 w-full">
                <LoginInputField
                  control={control}
                  setValue={setValue}
                  name={'username'}
                  label={'Tên đăng nhập'}
                  error={errors.username?.message}
                  placeholder={'Example@email.com'}
                  leftIcon={<UserIcon />}
                />
                <LoginInputField
                  control={control}
                  setValue={setValue}
                  name={'password'}
                  label={'Mật khẩu'}
                  error={errors.password?.message}
                  placeholder={''}
                  leftIcon={<LockIcon />}
                  password
                />
                <LoginButton
                  isPending={isPending}
                  handleSubmit={handleSubmit(onSubmit)}
                />
                <Box style={{ marginTop: Spacing.SPACING_60 }}>
                  <Stack
                    direction="column"
                    gap={Spacing.SPACING_25}
                    className="items-center"
                  >
                    {/*<Button*/}
                    {/*  href="/sign-in-phone"*/}
                    {/*  style={styles.btn}*/}
                    {/*  labelStyle={styles.btnLabel}*/}
                    {/*>*/}
                    {/*  Đăng nhập bằng Điện thoại*/}
                    {/*</Button>*/}
                    <ForgotPasswordBtn
                      handleForgetPassword={handleForgetPassword}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </CenterBox>
        </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
});

export default SignIn;

const styles = StyleSheet.create({
  underline: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
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
    marginTop: Spacing.SPACING_12,
    // height: Spacing.SPACING_10,
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
