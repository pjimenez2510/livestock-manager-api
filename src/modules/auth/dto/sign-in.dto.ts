import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({ example: 'juan.perez', description: 'El nombre de usuario' })
  @IsString({ message: 'El usuario debe ser una cadena de texto valida' })
  @IsNotEmpty({ message: 'El usuario es requerido' })
  username: string

  @ApiProperty({ example: 'password123', description: 'La contraseña' })
  @IsString({ message: 'La contraseña debe ser una cadena de texto valida' })
  @IsNotEmpty({ message: 'La contraseña es requerida' })
  password: string
}
