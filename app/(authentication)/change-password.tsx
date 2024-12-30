import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { Button, Stack, Typography } from '@/shared/components/base';
import { useTheme } from '@/shared/hooks';
import { Spacing } from '@/shared/constants/spacing';
import FontSize from '@/shared/constants/font-scale';
import { Fonts } from '@/shared/constants/themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordValidator } from '@/shared/validators/change-password.z';
import { useRouter } from 'expo-router';
import useChangePassword from '@/shared/services/mutations/auth/useChangePassword';
import { useEffect } from 'react';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import LoginInputField from '@/shared/components/ui/login/LoginInputField';
import axios from 'axios';

type FormInputs = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export default function ChangePassword() {
  const { colors } = useTheme();
  const router = useRouter();
  const { mutate, error, isPending, isSuccess, isError, reset } =
    useChangePassword();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(changePasswordValidator),
  });

  const onSubmit = React.useCallback(
    (data: FormInputs) => {
      mutate(data);
    },
    [mutate]
  );

  const handleGoChange = React.useCallback(() => {
    router.push('/forgot-password');
  }, [router]);

  const handleGoBack = React.useCallback(() => {
    router.back();
  }, [router]);

  useEffect(() => {
    if (error) {
      if (axios.isAxiosError(error)) {
        const reason = (error.response?.data as $ForgotPasswordResponse).reason;
        toast(`Yêu cầu thất bại: ${reason}`, {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          icon: '',
          styles: {
            pressable: {
              backgroundColor: colors.warn,
            },
            text: {
              fontWeight: '600',
            },
          },
        });
      }
    }
  }, [colors.warn, error]);

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast('Đổi mật khẩu thành công!', {
        duration: 4000,
        position: ToastPosition.BOTTOM,
        icon: '',
        styles: {
          pressable: {
            backgroundColor: colors.greenPrimary,
          },
        },
      });
    }
  }, [colors.greenPrimary, isSuccess, reset]);

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleGoBack} />}>
        Thay đổi mật khẩu
      </Scaffold.AppBar>
      <Scaffold.MainBox>
        <Stack direction="column" gap={Spacing.SPACING_24}>
          <LoginInputField
            labelColor="black"
            control={control}
            setValue={setValue}
            name={'oldPassword'}
            label={'Mật khẩu cũ'}
            error={errors.oldPassword?.message}
            password
          />
          <LoginInputField
            labelColor="black"
            control={control}
            setValue={setValue}
            name={'newPassword'}
            label={'Mật khẩu mới'}
            error={errors.newPassword?.message}
            password
          />
          <LoginInputField
            labelColor="black"
            control={control}
            setValue={setValue}
            name={'confirmNewPassword'}
            label={'Nhập lại mật khẩu mới'}
            error={errors.confirmNewPassword?.message}
            password
          />
          <Button
            onPress={handleSubmit(onSubmit)}
            style={[styles.btn, styles.loginBtn]}
            labelStyle={[styles.btnLabelLogin]}
            disabled={isPending}
          >
            {isPending ? 'Đang thay đổi...' : 'Cập nhật'}
          </Button>
          <Stack className="justify-center">
            <TouchableOpacity onPress={handleGoChange}>
              <Typography
                style={{
                  textDecorationStyle: 'solid',
                  textDecorationLine: 'underline',
                }}
                fontSize={FontSize.FONT_SIZE_14}
                color="black"
              >
                Đổi mật khẩu
              </Typography>
            </TouchableOpacity>
          </Stack>
        </Stack>
      </Scaffold.MainBox>
    </Scaffold>
  );
}

const styles = StyleSheet.create({
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
  btnLabelLogin: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: FontSize.FONT_SIZE_16,
    color: 'white',
    fontFamily: Fonts.Bold,
  },
  loginBtn: {
    height: Spacing.SPACING_51,
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
});
