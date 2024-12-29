import { ApiProperty } from '@nestjs/swagger/dist'
import { IsArray, ValidateNested } from 'class-validator'
import { UpdateAnimalDto } from './update-animal.dto'
import { Type } from 'class-transformer'

export class UpdateAnimalsDto {
  @ApiProperty({
    type: 'array',
    required: true,
  })
  @IsArray({ message: 'El id de los animales debe ser un array de números' })
  animalsId: number[]

  @ApiProperty({
    type: 'object',
    required: true,
  })
  @ValidateNested()
  @Type(() => UpdateAnimalDto) // Asegura la correcta validación de `data`
  data: UpdateAnimalDto
}
