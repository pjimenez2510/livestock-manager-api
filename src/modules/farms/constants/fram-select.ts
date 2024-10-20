import { Prisma } from '@prisma/client'

export const FarmSelectInput: Prisma.FarmDefaultArgs = {
  select: {
    id: true,
    name: true,
    address: true,
    purpose: true,
    dimension: true,
    createdAt: true,
  },
}
