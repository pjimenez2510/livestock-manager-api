import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger'
import { FarmsService } from './farms.service'
import { CreateFarmDto } from './dto/create-farm.dto'
import { UpdateFarmDto } from './dto/update-farm.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'

@ApiTags('farms')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una granja' })
  @ApiBody({ type: CreateFarmDto })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las granjas' })
  findAll() {
    return this.farmsService.getFarms()
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
    return this.farmsService.getFarm({
      id,
    })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Obtener lista de fincas por usuario' })
  @ApiParam({ name: 'id', description: 'Id de la granja', required: true })
  @ApiResponse({
    status: 200,
    description: 'The farm has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Farm not found.' })
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
    return this.farmsService.update(id, updateFarmDto)
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
