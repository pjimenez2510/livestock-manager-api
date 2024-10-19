import { Injectable } from '@nestjs/common'
import { CreateVaccineDto } from './dto/create-vaccine.dto'
import { UpdateVaccineDto } from './dto/update-vaccine.dto'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class VaccinesService {
  constructor(private readonly prisma: PrismaService) {}

  async getVaccine(where: Prisma.VaccineWhereUniqueInput) {
    const vaccine = await this.prisma.vaccine.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
    })
    if (!vaccine) {
      throw new Error('Vacuna no encontrada')
    }
    return vaccine
  }

  async getVaccines(where?: Prisma.VaccineWhereInput) {
    return await this.prisma.vaccine.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
    })
  }

  async create(data: CreateVaccineDto) {
    return await this.prisma.vaccine.create({
      data,
    })
  }

  async update(id: number, data: UpdateVaccineDto) {
    return await this.prisma.vaccine.update({
      data,
      where: {
        id,
        deletedAt: null,
      },
    })
  }

  async remove(id: number) {
    const vacineDelete = await this.prisma.vaccine.update({
      data: { deletedAt: new Date() },
      where: {
        id,
        deletedAt: null,
      },
    })
    return vacineDelete.deletedAt !== null
  }
}
