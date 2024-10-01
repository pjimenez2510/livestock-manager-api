import { Role } from '@prisma/client'
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  firstName: string

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
  })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  lastName: string

  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'juan.perez',
  })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  username: string

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  password: string

  @ApiProperty({
    description: 'Rol del usuario, puede ser ADMIN o USER',
    enum: Role,
    example: Role.ADMIN,
  })
  @IsEnum(Role, { message: 'El rol debe ser ADMIN o USER' })
  role: Role

  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'juan.perez@example.com',
  })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string

  @ApiProperty({
    description: 'Número de teléfono del usuario, debe ser de Ecuador',
    example: '0999999999',
  })
  @IsString({ message: 'El número de celular debe ser una cadena de texto' })
  phone: string

  @ApiPropertyOptional({
    description: 'ID de la ganaderia asociada (opcional)',
    example: 1,
  })
  @IsNumber({}, { message: 'El ID de la ganadería debe ser un número válido' })
  @IsOptional()
  livestockId?: number
}
