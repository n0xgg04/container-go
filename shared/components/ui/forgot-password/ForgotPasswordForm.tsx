import * as React from 'react';
import { useEffect } from 'react';
import { Box, Button, Stack } from '@/shared/components/base';
import FontSize from '@/shared/constants/font-scale';
import { StyleSheet } from 'react-native';
import { Spacing } from '@/shared/constants/spacing';
import { Fonts } from '@/shared/constants/themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordValidator } from '@/shared/validators/forgot-password.z';
import { toast, ToastPosition } from '@backpackapp-io/react-native-toast';
import useAppOverlayState from '@/states/hooks/useAppOverlayState';
import ForgotHeader from '@/shared/components/ui/forgot-password/ForgotHeader';
import EmailInputField from '@/shared/components/ui/forgot-password/EmailInputField';

type Props = {
  mutate: (props: any) => void;
  isError: boolean;
  isPending: boolean;
};

type FormInputs = ForgotPasswordFormInputs;

const ForgotPasswordForm = React.memo(
  ({ mutate, isError, isPending }: Props) => {
    const [, setOverlay] = useAppOverlayState();

    const {
      control,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm<FormInputs>({
      resolver: zodResolver(forgotPasswordValidator),
    });

    useEffect(() => {
      setOverlay((pre) => ({ ...pre, isLoading: isPending }));
    }, [isPending, setOverlay]);

    useEffect(() => {
      if (isError) {
        toast('Yêu cầu thất bại... Kiểm tra lại email!', {
          duration: 4000,
          position: ToastPosition.BOTTOM,
          icon: '👏',
        });
      }
    }, [isError]);

    const onSubmit = React.useCallback(
      (values: FormInputs) => {
        mutate({
          email: values.email,
        });
      },
      [mutate]
    );

    return (
      <>
        <Box
          style={{
            position: 'absolute',
            bottom: Spacing.SPACING_180,
            left: Spacing.SPACING_20,
            right: Spacing.SPACING_20,
          }}
        >
          <Button
            onPress={handleSubmit(onSubmit)}
            labelStyle={styles.btnLabel}
            href="/forgot-password"
            style={styles.btn}
            disabled={isPending}
          >
            {isPending ? 'Đang xử lý...' : 'Gửi'}
          </Button>
        </Box>
        <Stack
          direction="column"
          className="items-center"
          gap={Spacing.SPACING_8}
        >
          <ForgotHeader />
          <EmailInputField
            setValue={setValue}
            control={control}
            errorMessage={errors.email?.message}
          />
        </Stack>
      </>
    );
  }
);

export default ForgotPasswordForm;

const styles = StyleSheet.create({
  btnLabel: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: Fonts.Bold,
    fontSize: FontSize.FONT_SIZE_16,
    color: 'white',
  },
  btn: {
    marginTop: Spacing.SPACING_20,
    height: Spacing.SPACING_51,
    borderRadius: Spacing.SPACING_10,
    width: '100%',
  },
  btnLogin: {
    width: Spacing.SPACING_180,
    height: Spacing.SPACING_21,
  },
});
