import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Juan',
  })
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(1, { message: 'EL nombre es requerido' })
  firstName: string

  @ApiProperty({
    description: 'Apellido del usuario',
    example: 'Pérez',
  })
  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  @MinLength(1, { message: 'EL apellido es requerido' })
  lastName: string

  @ApiProperty({
    description: 'Nombre de usuario',
    example: 'juan.perez',
  })
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MinLength(5, {
    message: 'EL nombre de usuario debe tener mínimo 5 carácteres',
  })
  username: string

  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'password123',
  })
  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(6, {
    message: 'La contraseña debe tener mínimo 6 carácteres',
  })
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
}
