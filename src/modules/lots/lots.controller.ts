import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'
import { LotsService } from './lots.service'
import { CreateLotDto } from './dto/create-lot.dto'
import { UpdateLotDto } from './dto/update-lot.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { User } from '@prisma/client'

@ApiTags('Lotes')
@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo lote' })
  @ApiBody({ description: 'Información del nuevo lote', type: CreateLotDto })
  create(@CurrentUser() user: User, @Body() createLotDto: CreateLotDto) {
    return this.lotsService.create(createLotDto, user.livestockId)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los lotes' })
  findAll(@CurrentUser() user: User) {
    return this.lotsService.getLots({ farm: { livestockId: user.livestockId } })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lote por ID' })
  @ApiParam({ name: 'id', description: 'ID del lote', type: Number })
  findOne(
    @CurrentUser() user: User,
    @Param('id', new ParseIntWithMessagePipe('El Id del lote debe ser válido'))
    id: number,
  ) {
    return this.lotsService.getLot({
      id,
      farm: { livestockId: user.livestockId },
    })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lote por ID' })
  @ApiParam({ name: 'id', description: 'ID del lote', type: Number })
  @ApiBody({
    description: 'Información para actualizar el lote',
    type: UpdateLotDto,
  })
  update(
    @CurrentUser() user: User,
    @Param('id', new ParseIntWithMessagePipe('El Id del lote debe ser válido'))
    id: number,
    @Body() updateLotDto: UpdateLotDto,
  ) {
    return this.lotsService.update(id, user.livestockId, updateLotDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un lote por ID' })
  @ApiParam({ name: 'id', description: 'ID del lote', type: Number })
  remove(
    @CurrentUser() user: User,
    @Param('id', new ParseIntWithMessagePipe('El Id del lote debe ser válido'))
    id: number,
  ) {
    return this.lotsService.remove(id, user.livestockId)
  }
}
