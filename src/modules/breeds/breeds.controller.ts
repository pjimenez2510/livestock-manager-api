import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { BreedsService } from './breeds.service'
import { CreateBreedDto } from './dto/create-breed.dto'
import { UpdateBreedDto } from './dto/update-breed.dto'
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { BreedSelectInput } from './constants/breed-select'

@ApiTags('Razas')
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva raza' })
  @ApiBody({ type: CreateBreedDto })
  create(@Body() createBreedDto: CreateBreedDto) {
    return this.breedsService.create(createBreedDto, BreedSelectInput.select)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las razas' })
  findAll() {
    return this.breedsService.getBreeds({}, BreedSelectInput.select)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una raza' })
  @ApiParam({ name: 'id', description: 'Id de la raza', required: true })
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id de la raza debe ser válido'),
    )
    id: number,
  ) {
    return this.breedsService.getBreed({ id }, BreedSelectInput.select)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una raza' })
  @ApiBody({ type: UpdateBreedDto })
  @ApiParam({ name: 'id', description: 'Id de la raza', required: true })
  update(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id de la raza debe ser válido'),
    )
    id: number,
    @Body() updateBreedDto: UpdateBreedDto,
  ) {
    return this.breedsService.update(
      id,
      updateBreedDto,
      BreedSelectInput.select,
    )
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una raza' })
  @ApiParam({ name: 'id', description: 'Id de la raza', required: true })
  remove(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id de la raza debe ser válido'),
    )
    id: number,
  ) {
    return this.breedsService.remove(id)
  }
}
