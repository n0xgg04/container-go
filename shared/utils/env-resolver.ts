import z from 'zod';

export const EnvSchema = z.object({
  EXPO_PUBLIC_SENTRY_DNS: z.string({
    message: 'SENTRY_DNS is required!',
  }),
  EXPO_PUBLIC_GRAPHQL_ENDPOINT: z.string({
    message: 'GRAPHQL_ENDPOINT is required!',
  }),
});

export const ENV = EnvSchema.parse(process.env);
export type EnvZodType = z.infer<typeof EnvSchema>;
