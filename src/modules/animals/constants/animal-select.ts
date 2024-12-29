import { Prisma } from '@prisma/client'

export const AnimalSelectInput: Prisma.AnimalDefaultArgs = {
  select: {
    id: true,
    name: true,
    number: true,
    urlImg: true,
    description: true,
    dateOfBirth: true,
    dateOfPurchase: true,
    purpose: true,
    sex: true,
    status: true,
    breedId: true,
    motherId: true,
    fatherId: true,
    lotId: true,
    createdAt: true,
  },
}
