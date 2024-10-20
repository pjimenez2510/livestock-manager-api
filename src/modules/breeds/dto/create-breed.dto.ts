import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateBreedDto {
  @ApiProperty({ description: 'Raza del animal', example: 'Brahman' })
  @IsString({ message: 'La raza debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'La raza es requerida' })
  name: string

  @ApiProperty({
    description: 'Descripción del animal',
    example: 'Raza de originaria de la India',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  description: string
}
