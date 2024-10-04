import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateLotDto } from './dto/create-lot.dto'
import { UpdateLotDto } from './dto/update-lot.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
import { FarmsService } from '../farms/farms.service'

@Injectable()
export class LotsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly farmsService: FarmsService,
  ) {}

  async getLot(where: Prisma.LotWhereUniqueInput, select?: Prisma.LotSelect) {
    const lot = await this.prisma.lot.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      select,
    })
    if (!lot) {
      throw new NotFoundException('Lote no encontrado')
    }
    return lot
  }

  async getLots(where: Prisma.LotWhereInput, select?: Prisma.LotSelect) {
    return await this.prisma.lot.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
      select,
    })
  }

  private async validateFarm(farmId: number, livestockId: number) {
    const farm = await this.farmsService.getFarm({ id: farmId, livestockId })
    if (!farm) {
      throw new NotFoundException('Finca no encontrada')
    }
    return farm
  }

  async create(data: CreateLotDto, livestockId: number) {
    await this.validateFarm(data.farmId, livestockId)
    return await this.prisma.lot.create({
      data,
    })
  }

  async update(id: number, livestockId: number, data: UpdateLotDto) {
    if (data.farmId) {
      await this.validateFarm(data.farmId, livestockId)
    }
    return await this.prisma.lot.update({
      data,
      where: { id, deletedAt: null, farm: { livestockId } },
    })
  }

  async remove(id: number, livestockId: number) {
    return await this.prisma.lot.update({
      data: { deletedAt: new Date() },
      where: { id, deletedAt: null, farm: { livestockId } },
    })
  }
}
