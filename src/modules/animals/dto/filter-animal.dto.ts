import { ApiProperty } from '@nestjs/swagger'
import { AnimalSex, Purpose, StatusAnimal } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'
import { FilterLotDto } from 'src/modules/lots/dto/filter-lot.dto'

export class FilterAnimalDto {
  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  name?: string

  @ApiProperty({
    type: 'string',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El numero debe ser una cadena de texto' })
  number?: string

  @ApiProperty({
    type: 'string',
    format: 'data-time',
    required: false,
  })
  @IsOptional()
  dateOfBirth?: string

  @ApiProperty({
    type: 'string',
    format: 'data-time',
    required: false,
  })
  @IsOptional()
  dateOfPurchase?: string

  @ApiProperty({
    type: 'string',
    enum: Purpose,
    required: false,
  })
  @IsOptional()
  @IsEnum(Purpose, {
    message: 'El propósito debe ser carne, leche o doble propósito',
  })
  purpose?: Purpose

  @ApiProperty({
    type: 'string',
    enum: StatusAnimal,
    required: false,
  })
  @IsOptional()
  @IsEnum(StatusAnimal, {
    message: 'El estado debe ser vivo, vendido, deceso o perdido',
  })
  @IsOptional()
  status?: StatusAnimal

  @ApiProperty({
    type: 'string',
    enum: AnimalSex,
    required: false,
  })
  @IsOptional()
  @IsEnum(AnimalSex, {
    message: 'El sexo debe ser masculino o femenino',
  })
  sex?: AnimalSex

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id de la raza debe ser un número' })
  breedId?: number

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id de la madre debe ser un número' })
  motherId?: number

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id del padre debe ser un número' })
  fatherId?: number

  @ApiProperty({
    type: 'number',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id del lote debe ser un número' })
  lotId?: number

  @ApiProperty({
    type: () => FilterLotDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => FilterLotDto)
  lot?: FilterLotDto
}
