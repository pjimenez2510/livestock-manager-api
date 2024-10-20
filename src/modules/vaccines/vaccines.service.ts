import { Injectable } from '@nestjs/common'
import { CreateVaccineDto } from './dto/create-vaccine.dto'
import { UpdateVaccineDto } from './dto/update-vaccine.dto'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class VaccinesService {
  constructor(private readonly prisma: PrismaService) {}

  async getVaccine(
    where: Prisma.VaccineWhereUniqueInput,
    select?: Prisma.VaccineSelect,
  ) {
    const vaccine = await this.prisma.vaccine.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      select,
    })
    if (!vaccine) {
      throw new Error('Vacuna no encontrada')
    }
    return vaccine
  }

  async getVaccines(
    where?: Prisma.VaccineWhereInput,
    select?: Prisma.VaccineSelect,
  ) {
    return await this.prisma.vaccine.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
      select,
    })
  }

  async create(data: CreateVaccineDto, select?: Prisma.VaccineSelect) {
    return await this.prisma.vaccine.create({
      data,
      select,
    })
  }

  async update(
    id: number,
    data: UpdateVaccineDto,
    select?: Prisma.VaccineSelect,
  ) {
    return await this.prisma.vaccine.update({
      data,
      where: {
        id,
        deletedAt: null,
      },
      select,
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
