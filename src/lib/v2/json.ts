import type { Prisma } from '@prisma/client';

export function toInputJsonValue<T>(value: T): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}
