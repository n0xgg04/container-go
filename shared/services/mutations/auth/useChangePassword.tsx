import { useMutation } from '@tanstack/react-query';
import { ChangePassword } from '@/shared/features/auth/change-password';

export default function useChangePassword() {
  return useMutation({
    mutationKey: ['CHANGE_PASSWORD'],
    mutationFn: async (payload: $ChangePasswordPayload) => {
      return ChangePassword(payload);
    },
  });
}
