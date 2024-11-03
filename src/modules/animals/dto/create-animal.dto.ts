import { ApiProperty } from '@nestjs/swagger'
import { AnimalSex, Purpose, StatusAnimal } from '@prisma/client'
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateAnimalDto {
  @ApiProperty({
    description: 'Nombre del animal',
    example: 'Fifi',
  })
  @IsString({ message: 'El nombre del animal debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El nombre del animal es requerido' })
  name: string

  @ApiProperty({
    description: 'Número del animal',
    example: '123F78',
  })
  @IsString({ message: 'El número del animal debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'El número del animal es requerido' })
  number: string

  @ApiProperty({
    description: 'URL de la imagen del animal',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsString({
    message: 'La URL de la imagen del animal debe ser una cadena de texto',
  })
  urlImg?: string

  @ApiProperty({
    description: 'Descripción del animal',
    example: 'Una pequeña perra',
  })
  @IsOptional()
  @IsString({
    message: 'La descripción del animal debe ser una cadena de texto',
  })
  description?: string

  @ApiProperty({
    description: 'Fecha de nacimiento del animal',
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsString({
    message: 'La fecha de nacimiento del animal debe ser una cadena de texto',
  })
  dateOfBirth?: string | Date

  @ApiProperty({
    description: 'Fecha de compra del animal',
    type: 'string',
    format: 'date-time',
  })
  @IsOptional()
  @IsString({
    message: 'La fecha de compra del animal debe ser una cadena de texto',
  })
  dateOfPurchase?: string | Date

  @ApiProperty({
    description: 'Propósito del animal',
    enum: Purpose,
    example: Purpose.MEAT,
  })
  @IsEnum(Purpose, {
    message: 'El propósito del animal debe ser carne, leche o doble propósito',
  })
  purpose: Purpose

  @ApiProperty({
    description: 'Estado del animal',
    enum: StatusAnimal,
    example: StatusAnimal.ALIVE,
  })
  @IsEnum(StatusAnimal, {
    message: 'El estado del animal debe ser vivo, vendido, deceso o perdido',
  })
  @IsOptional()
  status?: StatusAnimal

  @ApiProperty({
    description: 'Sexo del animal',
    enum: AnimalSex,
    example: AnimalSex.MALE,
  })
  @IsEnum(AnimalSex, {
    message: 'El sexo del animal debe ser masculino o femenino',
  })
  sex: AnimalSex

  @ApiProperty({
    description: 'ID de la raza del animal',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id de la raza del animal debe ser un número' })
  breedId?: number

  @ApiProperty({
    description: 'ID de la madre del animal',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id de la madre del animal debe ser un número' })
  motherId?: number

  @ApiProperty({
    description: 'ID del padre del animal',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id del padre del animal debe ser un número' })
  fatherId?: number

  @ApiProperty({
    description: 'ID del lote del animal',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El Id del lote del animal debe ser un número' })
  lotId?: number
}
