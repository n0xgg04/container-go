import { GUARD_INSTANT } from '@/shared/instants/auth-guard';
import { useMutation } from '@tanstack/react-query';

export default function usePhone() {
  return useMutation({
    mutationFn: GUARD_INSTANT.phoneLogin,
    mutationKey: ['OTP'],
  });
}
