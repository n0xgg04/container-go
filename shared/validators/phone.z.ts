import z from 'zod';

export const phoneValidator = z.object({
  phone: z.string(
    { message: 'Số điện thoại không để trống.' }
  ).regex(/(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/, 
    { message: 'Số điện thoại không hợp lệ.' }
  )
});
