import { Prisma } from '@prisma/client'

export const LotSelectInput: Prisma.LotDefaultArgs = {
  select: {
    id: true,
    name: true,
    purpose: true,
    dimension: true,
    farmId: true,
    createdAt: true,
  },
}
