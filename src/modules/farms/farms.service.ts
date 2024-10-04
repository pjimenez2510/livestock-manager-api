import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateFarmDto } from './dto/create-farm.dto'
import { UpdateFarmDto } from './dto/update-farm.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { LivestockService } from '../livestock/livestock.service'

@Injectable()
export class FarmsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly livestockService: LivestockService,
  ) {}

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

  async getFarms(where: Prisma.FarmWhereInput, select?: Prisma.FarmSelect) {
    return await this.prisma.farm.findMany({
      where: {
        ...where,
      },
      select,
    })
  }

  private async validateLivestock(livestockId: number) {
    const livestock = await this.livestockService.getLivestock({
      id: livestockId,
    })
    if (!livestock) {
      throw new NotFoundException('Ganadería no encontrada')
    }
    return livestock
  }

  async create(livestockId: number, data: CreateFarmDto) {
    await this.validateLivestock(livestockId)
    return await this.prisma.farm.create({
      data,
    })
  }

  async update(id: number, livestockId: number, updateFarmDto: UpdateFarmDto) {
    return await this.prisma.farm.update({
      data: updateFarmDto,
      where: { id, deletedAt: null, livestockId },
    })
  }

  async remove(id: number, livestockId: number) {
    return await this.prisma.farm.update({
      data: { deletedAt: new Date() },
      where: { id, livestockId },
    })
  }
}
