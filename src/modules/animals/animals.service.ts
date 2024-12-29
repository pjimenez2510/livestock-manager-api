import { Injectable } from '@nestjs/common'
import { UpdateAnimalDto } from './dto/update-animal.dto'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateAnimalDto } from './dto/create-animal.dto'

@Injectable()
export class AnimalsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAnimal(
    where: Prisma.AnimalWhereUniqueInput,
    defaultArgs?: Prisma.AnimalDefaultArgs,
  ) {
    const animal = await this.prisma.animal.findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      ...defaultArgs,
    })
    if (!animal) {
      throw new Error('Animal not found')
    }
    return animal
  }

  async getAnimals(
    where?: Prisma.AnimalWhereInput,
    defaultArgs?: Prisma.AnimalDefaultArgs,
  ) {
    return await this.prisma.animal.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
      ...defaultArgs,
    })
  }

  async create(data: CreateAnimalDto, defaultArgs?: Prisma.AnimalDefaultArgs) {
    return await this.prisma.animal.create({
      data,
      ...defaultArgs,
    })
  }

  async update(
    id: number,
    data: UpdateAnimalDto,
    defaultArgs?: Prisma.AnimalDefaultArgs,
  ) {
    return await this.prisma.animal.update({
      data,
      where: { id, deletedAt: null },
      ...defaultArgs,
    })
  }

  async remove(id: number) {
    const animalDelete = await this.prisma.animal.update({
      data: { deletedAt: new Date() },
      where: { id, deletedAt: null },
    })
    return animalDelete.deletedAt !== null
  }
}
