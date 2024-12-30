import z from 'zod';

const signValidator = z.object({
  sender_name: z.string({
    message: 'Tên người gửi không được để trống',
  }),
});

export default signValidator;
