import z from 'zod';

const loginValidator = z.object({
  username: z
    .string({
      message: 'Không để trống.',
    })
    .email({
      message: 'Không hợp lệ.',
    }),
  password: z.string({
    message: 'Không để trống.',
  }),
});

export default loginValidator;
