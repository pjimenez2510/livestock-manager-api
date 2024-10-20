import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger'
import { FarmsService } from './farms.service'
import { CreateFarmDto } from './dto/create-farm.dto'
import { UpdateFarmDto } from './dto/update-farm.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { FarmSelectInput } from './constants/fram-select'

@ApiTags('Fincas')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una granja' })
  @ApiBody({ type: CreateFarmDto })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto, FarmSelectInput.select)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las granjas' })
  findAll() {
    return this.farmsService.getFarms({}, FarmSelectInput.select)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una granja por id' })
  @ApiParam({ name: 'id', description: 'Id de la granja', required: true })
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la finca debe ser un número valido',
      ),
    )
    id: number,
  ) {
    return this.farmsService.getFarm(
      {
        id,
      },
      FarmSelectInput.select,
    )
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Obtener lista de fincas por usuario' })
  @ApiParam({ name: 'id', description: 'Id de la granja', required: true })
  update(
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la finca debe ser un número valido',
      ),
    )
    id: number,
    @Body() updateFarmDto: UpdateFarmDto,
  ) {
    return this.farmsService.update(id, updateFarmDto, FarmSelectInput.select)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a farm by ID' })
  @ApiParam({ name: 'id', description: 'Id de la granja', required: true })
  remove(
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la finca debe ser un número valido',
      ),
    )
    id: number,
  ) {
    return this.farmsService.remove(id)
  }
}
