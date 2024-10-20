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
import { LotSelectInput } from './constants/lot-select'
@ApiTags('Lotes')
@Controller('lots')
export class LotsController {
  constructor(private readonly lotsService: LotsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo lote' })
  @ApiBody({ description: 'Información del nuevo lote', type: CreateLotDto })
  create(@Body() createLotDto: CreateLotDto) {
    return this.lotsService.create(createLotDto, LotSelectInput.select)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los lotes' })
  findAll() {
    return this.lotsService.getLots({}, LotSelectInput.select)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un lote por ID' })
  @ApiParam({ name: 'id', description: 'ID del lote', type: Number })
  findOne(
    @Param('id', new ParseIntWithMessagePipe('El Id del lote debe ser válido'))
    id: number,
  ) {
    return this.lotsService.getLot(
      {
        id,
      },
      LotSelectInput.select,
    )
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un lote por ID' })
  @ApiParam({ name: 'id', description: 'ID del lote', type: Number })
  @ApiBody({
    description: 'Información para actualizar el lote',
    type: UpdateLotDto,
  })
  update(
    @Param('id', new ParseIntWithMessagePipe('El Id del lote debe ser válido'))
    id: number,
    @Body() updateLotDto: UpdateLotDto,
  ) {
    return this.lotsService.update(id, updateLotDto, LotSelectInput.select)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un lote por ID' })
  @ApiParam({ name: 'id', description: 'ID del lote', type: Number })
  remove(
    @Param('id', new ParseIntWithMessagePipe('El Id del lote debe ser válido'))
    id: number,
  ) {
    return this.lotsService.remove(id)
  }
}
