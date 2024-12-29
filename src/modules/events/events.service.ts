import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createEventDto: CreateEventDto, select?: Prisma.EventSelect) {
    return await this.prisma.event.create({
      data: createEventDto,
      select,
    })
  }

  async findAll(where?: Prisma.EventWhereInput, select?: Prisma.EventSelect) {
    return await this.prisma.event.findMany({
      where: { ...where, deletedAt: null },
      select,
    })
  }

  async findOne(
    where: Prisma.EventWhereUniqueInput,
    select?: Prisma.EventSelect,
  ) {
    const event = await this.prisma.event.findUnique({
      where: { ...where, deletedAt: null },
      select,
    })
    if (!event) {
      throw new NotFoundException('Evento no encontrado')
    }

    return event
  }

  async update(
    id: number,
    updateEventDto: UpdateEventDto,
    select?: Prisma.EventSelect,
  ) {
    return await this.prisma.event.update({
      data: updateEventDto,
      where: { id, deletedAt: null },
      select,
    })
  }

  async remove(id: number) {
    const eventDelete = await this.prisma.event.update({
      data: { deletedAt: new Date() },
      where: { id, deletedAt: null },
    })
    return eventDelete.deletedAt !== null
  }
}
