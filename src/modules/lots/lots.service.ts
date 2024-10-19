import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateLotDto } from './dto/create-lot.dto'
import { UpdateLotDto } from './dto/update-lot.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'
@Injectable()
export class LotsService {
  constructor(private readonly prisma: PrismaService) {}

  async getLot(where: Prisma.LotWhereUniqueInput) {
    const lot = await this.prisma.lot.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
    })
    if (!lot) {
      throw new NotFoundException('Lote no encontrado')
    }
    return lot
  }

  async getLots(where?: Prisma.LotWhereInput) {
    return await this.prisma.lot.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
    })
  }

  async create(data: CreateLotDto) {
    return await this.prisma.lot.create({
      data,
    })
  }

  async update(id: number, data: UpdateLotDto) {
    return await this.prisma.lot.update({
      data,
      where: { id, deletedAt: null },
    })
  }

  async remove(id: number) {
    const lotDelete = await this.prisma.lot.update({
      data: { deletedAt: new Date() },
      where: { id, deletedAt: null },
    })
    return lotDelete.deletedAt !== null
  }
}
