import { Prisma } from '@prisma/client'

export const VaccineSelectInput: Prisma.VaccineDefaultArgs = {
  select: {
    id: true,
    name: true,
    description: true,
    intervalDays: true,
    createdAt: true,
  },
}
