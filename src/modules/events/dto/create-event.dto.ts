import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateEventDto {
  @ApiProperty({
    description: 'Título del evento',
    example: 'Evento de prueba',
  })
  @IsString({ message: 'El título debe ser una cadena de texto' })
  @MinLength(3, { message: 'El título debe tener al menos 3 caracteres' })
  title: string

  @ApiProperty({
    description: 'Descripción del evento',
    example: 'Descripción de prueba',
  })
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @IsOptional()
  description?: string

  @ApiProperty({
    description: 'Color del evento',
    example: '#FF0000',
  })
  @IsString({ message: 'El color debe ser una cadena de texto' })
  @MinLength(7, { message: 'El color debe tener al menos 7 caracteres' })
  color: string

  @ApiProperty({
    description: 'Fecha de inicio del evento',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
  startDate: Date

  @ApiProperty({
    description: 'Fecha de fin del evento',
    example: '2021-01-01T00:00:00.000Z',
  })
  @IsDate({ message: 'La fecha de fin debe ser una fecha válida' })
  endDate: Date
}
