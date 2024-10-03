import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { LivestockService } from './livestock.service'
import { CreateLivestockDto } from './dto/create-livestock.dto'
import { UpdateLivestockDto } from './dto/update-livestock.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { User } from '@prisma/client'

@ApiTags('Livestock')
@Controller('livestock')
export class LivestockController {
  constructor(private readonly livestockService: LivestockService) {}

  @Post()
  @ApiOperation({ summary: 'Crear nueva ganadería' })
  @ApiBody({ type: CreateLivestockDto })
  create(@Body() createLivestockDto: CreateLivestockDto) {
    return this.livestockService.create(createLivestockDto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener lista de todas las ganaderías' })
  findAll(@CurrentUser() user: User) {
    return this.livestockService.getLivestocks({
      users: { some: { id: user.id } },
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener información de una ganadería por su ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El ID de la ganadería',
    type: Number,
  })
  findOne(
    @CurrentUser() user: User,
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la ganadería debe ser un número valido',
      ),
    )
    id: number,
  ) {
    return this.livestockService.getLivestock({
      id,
      users: { some: { id: user.id } },
    })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar los datos de una ganadería por su ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El ID de la ganadería',
    type: Number,
  })
  @ApiBody({ type: UpdateLivestockDto })
  update(
    @CurrentUser() user: User,
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la ganaderia debe ser un número valido',
      ),
    )
    id: number,
    @Body() updateLivestockDto: UpdateLivestockDto,
  ) {
    return this.livestockService.update(id, user.id, updateLivestockDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una ganadería por su ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'El ID de la ganadería',
    type: Number,
  })
  remove(
    @CurrentUser() user: User,
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la ganadería debe ser un número valido',
      ),
    )
    id: number,
  ) {
    return this.livestockService.remove(id, user.id)
  }
}
