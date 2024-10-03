import { Injectable } from '@nestjs/common'
import { CreateLivestockDto } from './dto/create-livestock.dto'
import { UpdateLivestockDto } from './dto/update-livestock.dto'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class LivestockService {
  constructor(private readonly prisma: PrismaService) {}

  async getLivestock(
    where: Prisma.LivestockWhereUniqueInput,
    select?: Prisma.LivestockSelect,
  ) {
    return await this.prisma.livestock.findUnique({
      where,
      select,
    })
  }

  async getLivestocks(
    where: Prisma.LivestockWhereInput,
    select?: Prisma.LivestockSelect,
  ) {
    return await this.prisma.livestock.findMany({
      where,
      select,
    })
  }

  async create(data: CreateLivestockDto) {
    return await this.prisma.livestock.create({
      data,
    })
  }

  async update(
    id: number,
    userId: number,
    updateLivestockDto: UpdateLivestockDto,
  ) {
    return await this.prisma.livestock.update({
      data: updateLivestockDto,
      where: { id, users: { some: { id: userId } } },
    })
  }

  async remove(id: number, userId: number) {
    return await this.prisma.livestock.update({
      data: { deletedAt: new Date() },
      where: { id, users: { some: { id: userId } } },
    })
  }
}
