import { Injectable, NotFoundException } from '@nestjs/common'
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
    const farm = await this.prisma.farm.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      select,
    })
    if (!farm) {
      throw new NotFoundException('Finca no encontrada')
    }
    return farm
  }

  async getFarms(where?: Prisma.FarmWhereInput, select?: Prisma.FarmSelect) {
    return await this.prisma.farm.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
      select: { ...select, deletedAt: false },
    })
  }

  async create(data: CreateFarmDto, select?: Prisma.FarmSelect) {
    return await this.prisma.farm.create({
      data,
      select,
    })
  }

  async update(
    id: number,
    updateFarmDto: UpdateFarmDto,
    select?: Prisma.FarmSelect,
  ) {
    return await this.prisma.farm.update({
      data: updateFarmDto,
      where: { id, deletedAt: null },
      select,
    })
  }

  async remove(id: number) {
    const farmDelete = await this.prisma.farm.update({
      data: { deletedAt: new Date() },
      where: { id },
    })
    return farmDelete.deletedAt !== null
  }
}
