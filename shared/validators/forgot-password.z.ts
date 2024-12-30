import z from 'zod';

export const forgotPasswordValidator = z.object({
  email: z
    .string({
      message: 'Email không để trống.',
    })
    .email({
      message: 'Email không hợp lệ.',
    }),
});
