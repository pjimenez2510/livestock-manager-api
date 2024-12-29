import { BadRequestException, Injectable } from '@nestjs/common'
import { UpdateAnimalDto } from './dto/update-animal.dto'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { CreateAnimalDto } from './dto/create-animal.dto'
import { FilterAnimalDto } from './dto/filter-animal.dto'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { UpdateAnimalsDto } from './dto/update-animals.dto'

@Injectable()
export class AnimalsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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
    filterParams?: FilterAnimalDto,
    defaultArgs?: Prisma.AnimalDefaultArgs,
  ) {
    const { filter, ...res } = filterParams
    const where: Prisma.AnimalWhereInput = res
    if (filter) {
      where.OR = [
        { name: { contains: filter, mode: 'insensitive' } },
        { number: { contains: filter, mode: 'insensitive' } },
      ]
    }
    return await this.prisma.animal.findMany({
      where: {
        ...where,
        deletedAt: null,
      },
      ...defaultArgs,
      orderBy: { createdAt: 'desc' },
    })
  }

  async create(
    data: CreateAnimalDto,
    file?: Express.Multer.File,
    defaultArgs?: Prisma.AnimalDefaultArgs,
  ) {
    let urlImg: string | undefined
    let imagePublicId: string | undefined

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadImage(file)
      urlImg = uploadResult.secure_url
      imagePublicId = uploadResult.public_id
    }

    return await this.prisma.animal.create({
      data: {
        ...data,
        urlImg,
        imagePublicId,
      },
      ...defaultArgs,
    })
  }

  async update(
    id: number,
    data: UpdateAnimalDto,
    file?: Express.Multer.File,
    defaultArgs?: Prisma.AnimalDefaultArgs,
  ) {
    if (data.motherId === id) {
      throw new BadRequestException('La madre no puede ser el mismo animal')
    }

    if (data.fatherId === id) {
      throw new BadRequestException('El padre no puede ser el mismo animal')
    }
    const animal = await this.getAnimal({ id })

    let urlImg = animal.urlImg
    let imagePublicId = animal.imagePublicId

    if (file) {
      if (animal.imagePublicId) {
        await this.cloudinaryService.deleteImage(animal.imagePublicId)
      }

      const uploadResult = await this.cloudinaryService.uploadImage(file)
      urlImg = uploadResult.secure_url
      imagePublicId = uploadResult.public_id
    }

    return await this.prisma.animal.update({
      data: {
        ...data,
        urlImg,
        imagePublicId,
      },
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

  async restore(id: number) {
    const animalRestore = await this.prisma.animal.update({
      data: { deletedAt: null },
      where: { id, deletedAt: { not: null } },
    })
    return animalRestore.deletedAt === null
  }

  async updateAnimals(updateAnimalsDto: UpdateAnimalsDto) {
    return await this.prisma.animal.updateMany({
      data: { ...updateAnimalsDto.data },
      where: { id: { in: updateAnimalsDto.animalsId } },
    })
  }
}
