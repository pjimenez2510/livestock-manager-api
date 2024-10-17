import { Prisma } from '@prisma/client'

export const UserSelectInput: Prisma.UserDefaultArgs = {
  select: {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    role: true,
    email: true,
    phone: true,
    createdAt: true,
  },
}
