import { EnvZodType } from '@/shared/utils/env-resolver';

declare global {
  type Env = EnvZodType;
}

export {};
