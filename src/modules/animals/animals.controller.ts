import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common'
import { AnimalsService } from './animals.service'
import { CreateAnimalDto } from './dto/create-animal.dto'
import { UpdateAnimalDto } from './dto/update-animal.dto'
import { AnimalSelectInput } from './constants/animal-select'
import { FilterAnimalDto } from './dto/filter-animal.dto'
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { UpdateAnimalsDto } from './dto/update-animals.dto'

@ApiTags('Animales')
@Controller('animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Crear un nuevo animal' })
  @ApiBody({ type: CreateAnimalDto })
  create(
    @Body() createAnimalDto: CreateAnimalDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 5MB
          message: 'La imagen no debe pesar más de 5MB',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...res } = createAnimalDto
    return this.animalsService.create(res, file)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los animales' })
  findAll(@Query() filterParams: FilterAnimalDto) {
    return this.animalsService.getAnimals(filterParams, {
      select: {
        ...AnimalSelectInput.select,
        lot: { select: { name: true, id: true } },
        father: { select: { name: true, id: true } },
        mother: { select: { name: true, id: true } },
      },
    })
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un animal por ID' })
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del animal debe ser válido'),
    )
    id: number,
  ) {
    return this.animalsService.getAnimal({ id }, AnimalSelectInput)
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Actualizar un animal por ID' })
  update(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del animal debe ser válido'),
    )
    id: number,
    @Body() updateAnimalDto: UpdateAnimalDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 5MB
          message: 'La imagen no debe pesar más de 5MB',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, ...res } = updateAnimalDto
    return this.animalsService.update(id, res, file)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un animal por ID' })
  remove(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del animal debe ser válido'),
    )
    id: number,
  ) {
    return this.animalsService.remove(id)
  }

  @Patch('/bulk/update')
  @ApiOperation({ summary: 'Actualizar varios animales por ID' })
  updateAnimals(@Body() updateAnimalsDto: UpdateAnimalsDto) {
    return this.animalsService.updateAnimals(updateAnimalsDto)
  }
}
