import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { UserSelectInput } from './constants/user-select'

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
    userWhereInput: Prisma.UserWhereInput,
    select?: Prisma.UserSelect,
  ) {
    return await this.prisma.user.findMany({
      where: {
        ...userWhereInput,
      },
      select,
    })
  }

  async create(data: CreateUserDto, select?: Prisma.UserSelect) {
    return await this.prisma.user.create({
      data,
      select,
    })
  }

  async findAll() {
    return await this.prisma.user.findMany({
      where: {
        deletedAt: null,
      },
      select: UserSelectInput.select,
    })
  }

  async findId(id: number) {
    return await this.getUser({ id }, UserSelectInput.select)
  }

  async update(id: number, data: UpdateUserDto, select?: Prisma.UserSelect) {
    return await this.prisma.user.update({
      data,
      where: { id, deletedAt: null },
      select,
    })
  }

  async remove(id: number) {
    const userDeleted = await this.prisma.user.update({
      data: { deletedAt: new Date() },
      where: { id },
    })
    return userDeleted.deletedAt !== null
  }
}
