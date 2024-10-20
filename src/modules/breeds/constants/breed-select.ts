import { Prisma } from '@prisma/client'

export const BreedSelectInput: Prisma.BreedDefaultArgs = {
  select: {
    id: true,
    name: true,
    description: true,
    createdAt: true,
  },
}
