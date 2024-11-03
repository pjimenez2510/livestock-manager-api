import { ApiProperty } from '@nestjs/swagger'
import { IntervalType } from '@prisma/client'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateVaccineDto {
  @ApiProperty({ description: 'Nombre de la vacuna', example: 'La rabia' })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  name: string

  @ApiProperty({
    description: 'Descripción de la vacuna',
    example: 'La rabia es una vacuna para la infección por rabia',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  description?: string

  @ApiProperty({
    description: 'Intervalo de vacunación en días',
    example: 7,
  })
  @IsInt({ message: 'El intervalo debe ser un número' })
  @Min(0, { message: 'El intervalo debe ser mayor o igual a 0' })
  @IsOptional()
  intervalDays?: number

  @ApiProperty({
    description: 'Tipo de intervalo de vacunación',
    enum: IntervalType,
    example: IntervalType.DAY,
  })
  @IsEnum(IntervalType, {
    message: 'El tipo de intervalo debe ser un día, mes o año',
  })
  @IsOptional()
  intervalType?: IntervalType
}
