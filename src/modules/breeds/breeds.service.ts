import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateBreedDto } from './dto/create-breed.dto'
import { UpdateBreedDto } from './dto/update-breed.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class BreedsService {
  constructor(private readonly prisma: PrismaService) {}

  async getBreed(
    where: Prisma.BreedWhereUniqueInput,
    select?: Prisma.BreedSelect,
  ) {
    const breed = await this.prisma.breed.findUnique({
      where: { ...where, deletedAt: null },
      select,
    })

    if (!breed) {
      throw new NotFoundException('Raza no encontrada')
    }
    return breed
  }

  async getBreeds(where?: Prisma.BreedWhereInput, select?: Prisma.BreedSelect) {
    return await this.prisma.breed.findMany({
      where: { ...where, deletedAt: null },
      select,
    })
  }

  async create(data: CreateBreedDto, select?: Prisma.BreedSelect) {
    return await this.prisma.breed.create({
      data,
      select,
    })
  }

  async update(id: number, data: UpdateBreedDto, select?: Prisma.BreedSelect) {
    return await this.prisma.breed.update({
      data,
      where: { id, deletedAt: null },
      select,
    })
  }

  async remove(id: number) {
    const breedDelete = await this.prisma.breed.update({
      data: { deletedAt: new Date() },
      where: { id },
    })
    return breedDelete.deletedAt !== null
  }
}
