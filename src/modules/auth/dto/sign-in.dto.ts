import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class SignInDto {
  @ApiProperty({ example: 'juan.perez', description: 'El nombre de usuario' })
  @IsString()
  username: string

  @ApiProperty({ example: 'password123', description: 'La contraseña' })
  @IsString()
  password: string
}
