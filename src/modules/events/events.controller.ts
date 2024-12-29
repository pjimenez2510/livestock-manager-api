import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'

import { EventsService } from './events.service'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { EventSelectInput } from './constants/event-select'

@ApiTags('Eventos')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo evento' })
  @ApiBody({ type: CreateEventDto })
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto, EventSelectInput.select)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los eventos' })
  findAll() {
    return this.eventsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un evento' })
  @ApiParam({ name: 'id', description: 'Id del evento', required: true })
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del evento debe ser un número valido'),
    )
    id: number,
  ) {
    return this.eventsService.findOne({ id })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un evento' })
  @ApiBody({ type: UpdateEventDto })
  @ApiParam({ name: 'id', description: 'Id del evento', required: true })
  update(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del evento debe ser un número valido'),
    )
    id: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(
      id,
      updateEventDto,
      EventSelectInput.select,
    )
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un evento' })
  @ApiParam({ name: 'id', description: 'Id del evento', required: true })
  remove(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del evento debe ser un número valido'),
    )
    id: number,
  ) {
    return this.eventsService.remove(id)
  }
}
