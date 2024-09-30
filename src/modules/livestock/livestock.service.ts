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

  async findAll() {
    return await this.prisma.livestock.findMany()
  }

  async findOne(id: number) {
    return await this.getLivestock({ id })
  }

  async update(id: number, updateLivestockDto: UpdateLivestockDto) {
    return await this.prisma.livestock.update({
      data: updateLivestockDto,
      where: { id },
    })
  }

  async remove(id: number) {
    return await this.prisma.livestock.update({
      data: { deletedAt: new Date() },
      where: { id },
    })
  }
}
