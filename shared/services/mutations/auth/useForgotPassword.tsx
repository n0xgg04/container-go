import { GUARD_INSTANT } from '@/shared/instants/auth-guard';
import { useMutation } from '@tanstack/react-query';

export default function useForgotPassword() {
  return useMutation({
    mutationFn: GUARD_INSTANT.forgotPassword,
    mutationKey: ['FORGOT_PASSWORD'],
  });
}
