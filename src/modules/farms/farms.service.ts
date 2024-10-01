import { Injectable } from '@nestjs/common'
import { CreateFarmDto } from './dto/create-farm.dto'
import { UpdateFarmDto } from './dto/update-farm.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class FarmsService {
  constructor(private readonly prisma: PrismaService) {}

  async getFarm(
    where: Prisma.FarmWhereUniqueInput,
    select?: Prisma.FarmSelect,
  ) {
    return await this.prisma.farm.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      select,
    })
  }

  async getFarms(where: Prisma.FarmWhereInput, select?: Prisma.FarmSelect) {
    return await this.prisma.farm.findMany({
      where: {
        ...where,
      },
      select,
    })
  }

  async create(data: CreateFarmDto) {
    return await this.prisma.farm.create({
      data,
    })
  }

  async findAll() {
    return await this.prisma.farm.findMany({ where: { deletedAt: null } })
  }

  async findOne(id: number) {
    return await this.getFarm({ id })
  }

  async update(id: number, updateFarmDto: UpdateFarmDto) {
    return await this.prisma.farm.update({
      data: updateFarmDto,
      where: { id, deletedAt: null },
    })
  }

  async remove(id: number) {
    return await this.prisma.farm.update({
      data: { deletedAt: new Date() },
      where: { id },
    })
  }
}
