import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreateSubscriptionDto {
  @ApiProperty({
    example: 'adgyw-12afdywu09_da8w',
  })
  @IsString()
  token: string

  @ApiProperty({ example: '1' })
  @IsNumber({}, { message: 'El userId debe ser un número' })
  userId: number
}
