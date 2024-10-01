import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateLivestockDto {
  @ApiProperty({
    description: 'Nombre del ganado',
    example: 'Granja Los Álamos',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name: string

  @ApiProperty({
    description: 'Dirección del ganado',
    example: 'Recinto Corazón de Jesús, Sector 5',
  })
  @IsString({ message: 'La dirección debe ser una cadena de texto' })
  address: string
}
