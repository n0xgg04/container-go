import * as React from 'react';
import Scaffold from '@/shared/components/common/Scaffold';
import BackIcon from '@/assets/images/svg/BackIcon';
import { useRouter } from 'expo-router';
import ForgotPasswordForm from '@/shared/components/ui/forgot-password/ForgotPasswordForm';
import Popup from '@/shared/components/common/Popup';
import useForgotPassword from '@/shared/services/mutations/auth/useForgotPassword';

export default function ForgotPassword() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleSuccess = () => {
    router.replace('/sign-in');
  };

  const { mutate, isPending, isSuccess, isError } = useForgotPassword();

  return (
    <Scaffold>
      <Scaffold.AppBar leftSection={<BackIcon onPress={handleBack} />}>
        Khôi phục mật khẩu
      </Scaffold.AppBar>
      {isSuccess && (
        <Popup
          visible={true}
          onClose={handleSuccess}
          title="Đã gửi yêu cầu đặt lại mật khẩu. Hãy kiểm tra email!"
        />
      )}
      <Scaffold.MainBox>
        <ForgotPasswordForm
          isPending={isPending}
          isError={isError}
          mutate={mutate}
        />
      </Scaffold.MainBox>
    </Scaffold>
  );
}
