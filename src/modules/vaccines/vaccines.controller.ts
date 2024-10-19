import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { VaccinesService } from './vaccines.service'
import { CreateVaccineDto } from './dto/create-vaccine.dto'
import { UpdateVaccineDto } from './dto/update-vaccine.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Vacunas')
@Controller('vaccines')
export class VaccinesController {
  constructor(private readonly vaccinesService: VaccinesService) {}

  @Post()
  create(@Body() createVaccineDto: CreateVaccineDto) {
    return this.vaccinesService.create(createVaccineDto)
  }

  @Get()
  findAll() {
    return this.vaccinesService.getVaccines()
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del vacuna debe ser válido'),
    )
    id: number,
  ) {
    return this.vaccinesService.getVaccine({ id })
  }

  @Patch(':id')
  update(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del vacuna debe ser válido'),
    )
    id: number,
    @Body() updateVaccineDto: UpdateVaccineDto,
  ) {
    return this.vaccinesService.update(id, updateVaccineDto)
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del vacuna debe ser válido'),
    )
    id: number,
  ) {
    return this.vaccinesService.remove(id)
  }
}
