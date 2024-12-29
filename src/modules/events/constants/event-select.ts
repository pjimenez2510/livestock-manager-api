import { Prisma } from '@prisma/client'

export const EventSelectInput: Prisma.EventDefaultArgs = {
  select: {
    id: true,
    title: true,
    description: true,
    color: true,
    startDate: true,
    endDate: true,
    createdAt: true,
  },
}
