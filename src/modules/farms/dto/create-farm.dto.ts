import { IsString, IsEnum, IsNumber, Min } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Purpose } from '@prisma/client'

export class CreateFarmDto {
  @ApiProperty({
    description: 'El nombre de la granja',
    example: 'Sunny Acres',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string

  @ApiProperty({
    description: 'Direccion  de la granja',
    example: '123 Main St',
  })
  @IsString({ message: 'La direccion debe ser una cadena de texto' })
  address: string

  @ApiProperty({
    description: 'El propósito de la granja',
    enum: Purpose,
    example: Purpose.MEAT,
  })
  @IsEnum(Purpose, {
    message: 'El propósito debe ser carne, leche o doble propósito',
  })
  purpose: Purpose

  @ApiProperty({
    description: 'El tamaño de la granja en hectáreas',
    example: 150,
  })
  @IsNumber({}, { message: 'El tamaño debe ser un número positivo' })
  @Min(1, { message: 'El tamaño debe ser al menos 1 hectárea' })
  dimension: number
}
