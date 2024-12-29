import { FilterParams } from '../interfaces/filter-params'
import { ApiProperty } from '@nestjs/swagger'
import { Purpose } from '@prisma/client'
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator'

export class FilterLotDto implements FilterParams {
  @ApiProperty({ description: 'Nombre del lote', required: false })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsOptional()
  name?: string

  @ApiProperty({
    description: 'Propósito del lote',
    enum: Purpose,
    example: Purpose.MEAT,
    required: false,
  })
  @IsString({ message: 'El propósito debe ser carne, leche o doble propósito' })
  @IsOptional()
  purpose?: Purpose

  @ApiProperty({
    description: 'Dimensión del lote',
    required: false,
  })
  @IsNumber({}, { message: 'La dimensión debe ser un número' })
  @IsOptional()
  dimension?: number

  @ApiProperty({ description: 'ID de la granja', required: false })
  @IsInt({ message: 'El ID de la granja debe ser un número entero' })
  @IsOptional()
  farmId?: number
}
