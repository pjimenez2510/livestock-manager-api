import { ApiProperty } from '@nestjs/swagger'
import { ValidateNested } from 'class-validator'
import { CreateLivestockDto } from 'src/modules/livestock/dto/create-livestock.dto'
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto'

export class SignUpDto {
  @ApiProperty({ type: CreateUserDto })
  @ValidateNested({ each: true, message: 'Datos inválidos del usuario' })
  user: CreateUserDto

  @ApiProperty({ type: CreateLivestockDto })
  @ValidateNested({ each: true, message: 'Datos inválidos de la ganadería' })
  livestock: CreateLivestockDto
}
