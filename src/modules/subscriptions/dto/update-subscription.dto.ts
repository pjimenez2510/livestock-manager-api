import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

export class UpdateSubscriptionDto {
  @ApiProperty({ example: '1' })
  @IsNumber({}, { message: 'El userId debe ser un número' })
  userId?: number

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  available: boolean
}
