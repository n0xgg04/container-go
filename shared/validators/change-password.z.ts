import z from 'zod';

export const changePasswordValidator = z
  .object({
    oldPassword: z
      .string({
        message: 'Mật khẩu cũ không được để trống!',
      })
      .max(32, {
        message: 'Mật khẩu tối đa 32 ký tự',
      })
      .min(6, {
        message: 'Mật khẩu tối đa 6 ký tự',
      }),
    newPassword: z
      .string({
        message: 'Mật khẩu mới không được để trống',
      })
      .max(32, {
        message: 'Mật khẩu tối đa 32 ký tự',
      })
      .min(6, {
        message: 'Mật khẩu tối đa 6 ký tự',
      }),
    confirmNewPassword: z.string({
      message: 'Xác nhận mật khẩu không được để trống',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Mật khẩu xác nhận không trùng nhau.',
    path: ['confirmNewPassword'],
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message: 'Mật khẩu mới phải khác mật khẩu cũ.',
    path: ['newPassword'],
  });
