import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { genSalt, hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        ...userWhereUniqueInput,
        deletedAt: null,
      },
      select,
    })
    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }
    return user
  }

  async getUsers(
    userWhereInput?: Prisma.UserWhereInput,
    select?: Prisma.UserSelect,
  ) {
    return await this.prisma.user.findMany({
      where: {
        ...userWhereInput,
        deletedAt: null,
      },
      select,
    })
  }

  async create(data: CreateUserDto, select?: Prisma.UserSelect) {
    const saltedPassword = await this.generateSaltPassword(data.password)
    data.password = saltedPassword
    return await this.prisma.user.create({
      data,
      select,
    })
  }

  async update(id: number, data: UpdateUserDto, select?: Prisma.UserSelect) {
    if (data.password) {
      const saltedPassword = await this.generateSaltPassword(data.password)
      data.password = saltedPassword
    }
    return await this.prisma.user.update({
      data,
      where: { id, deletedAt: null },
      select,
    })
  }

  async remove(id: number) {
    const userDeleted = await this.prisma.user.update({
      data: { deletedAt: new Date() },
      where: { id, deletedAt: null },
    })
    return userDeleted.deletedAt !== null
  }

  async generateSaltPassword(password: string): Promise<string> {
    const ROUNDS = 10
    const SALT = await genSalt(ROUNDS)

    return hash(password, SALT)
  }
}
