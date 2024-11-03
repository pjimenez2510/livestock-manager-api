import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { AnimalsService } from './animals.service'
import { CreateAnimalDto } from './dto/create-animal.dto'
import { UpdateAnimalDto } from './dto/update-animal.dto'
import { AnimalSelectInput } from './constants/animal-select'
import { FilterAnimalDto } from './dto/filter-animal.dto'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'

@ApiTags('Animales')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo animal' })
  @ApiBody({ type: CreateAnimalDto })
  create(@Body() createAnimalDto: CreateAnimalDto) {
    return this.animalsService.create(createAnimalDto)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los animales' })
  findAll(@Query() filterParams: FilterAnimalDto) {
    return this.animalsService.getAnimals(filterParams, AnimalSelectInput)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un animal por ID' })
  findOne(@Param('id') id: number) {
    return this.animalsService.getAnimal({ id }, AnimalSelectInput)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un animal por ID' })
  update(@Param('id') id: string, @Body() updateAnimalDto: UpdateAnimalDto) {
    return this.animalsService.update(+id, updateAnimalDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un animal por ID' })
  remove(@Param('id') id: string) {
    return this.animalsService.remove(+id)
  }
}
