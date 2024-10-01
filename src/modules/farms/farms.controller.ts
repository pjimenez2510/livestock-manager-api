import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { FarmsService } from './farms.service'
import { CreateFarmDto } from './dto/create-farm.dto'
import { UpdateFarmDto } from './dto/update-farm.dto'
import { Farm } from './entities/farm.entity'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'

@ApiTags('farms')
@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new farm' })
  @ApiResponse({
    status: 201,
    description: 'The farm has been successfully created.',
    type: Farm,
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto)
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all farms' })
  @ApiResponse({ status: 200, description: 'List of all farms.', type: [Farm] })
  findAll() {
    return this.farmsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a farm by ID' })
  @ApiResponse({
    status: 200,
    description: 'The farm with the given ID.',
    type: Farm,
  })
  @ApiResponse({ status: 404, description: 'Farm not found.' })
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la finca debe ser un número valido',
      ),
    )
    id: number,
  ) {
    return this.farmsService.findOne(id)
  }

  @Get('livestock/:id')
  @ApiOperation({ summary: 'Obtener lista de fincas por ganadería' })
  @ApiResponse({
    status: 200,
    description: 'List of all farms that belong to the given livestock.',
    type: [Farm],
  })
  @ApiResponse({ status: 404, description: 'Farm not found.' })
  findByLivestock(
    @Param(
      'id',
      new ParseIntWithMessagePipe(
        'El Id de la finca debe ser un número valido',
      ),
    )
    id: number,
  ) {
    return this.farmsService.getFarms({ livestockId: id })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Obtener lista de fincas por usuario' })
  @ApiResponse({
    status: 200,
    description: 'The farm has been successfully updated.',
    type: Farm,
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
  @ApiResponse({
    status: 200,
    description: 'The farm has been successfully removed.',
  })
  @ApiResponse({ status: 404, description: 'Farm not found.' })
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
