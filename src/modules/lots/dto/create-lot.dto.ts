import { Purpose } from '@prisma/client'
import { IsString, IsEnum, IsNumber, IsInt, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateLotDto {
  @ApiProperty({ description: 'Nombre del lote' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string

  @ApiProperty({
    description: 'Propósito del lote',
    enum: Purpose,
    example: Purpose.MEAT,
  })
  @IsEnum(Purpose, {
    message: 'El propósito debe ser carne, leche o doble propósito',
  })
  purpose: Purpose

  @ApiProperty({ description: 'Dimensión del lote' })
  @IsNumber({}, { message: 'La dimensión debe ser un número' })
  dimension: number

  @ApiProperty({ description: 'ID de la granja' })
  @IsInt({ message: 'El ID de la granja debe ser un número entero' })
  farmId: number
}
