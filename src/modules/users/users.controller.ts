import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { UserSelectInput } from './constants/user-select'
import { User } from '@prisma/client'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado con éxito.',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, UserSelectInput.select)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios por ganadería' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los usuarios que pertenecen a una ganaderia',
  })
  findAll(@CurrentUser() user: User) {
    return this.usersService.getUsers(
      { livestockId: user.livestockId },
      UserSelectInput.select,
    )
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Detalles del usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(
    @CurrentUser() user: User,
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del usuario debe ser un numero valio'),
    )
    id: number,
  ) {
    return this.usersService.getUser({
      id,
      livestock: { id: user.livestockId },
    })
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'El usuario ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  update(
    @CurrentUser() user: User,
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del usuario debe ser un numero valio'),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(
      id,
      user.livestockId,
      updateUserDto,
      UserSelectInput.select,
    )
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'El usuario ha sido eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  remove(
    @CurrentUser() user: User,
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del usuario debe ser un numero valio'),
    )
    id: number,
  ) {
    return this.usersService.remove(id, user.livestockId)
  }
}
