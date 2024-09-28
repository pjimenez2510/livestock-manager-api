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
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios.' })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':livestockId')
  @ApiOperation({ summary: 'Obtener todos los usuarios por ganadería' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los usuarios que pertenecen a una ganaderia',
  })
  findByLivestock(
    @Param(
      'livestockId',
      new ParseIntWithMessagePipe(
        'El Id de la ganadería debe ser un número valido',
      ),
    )
    livestockId: number,
  ) {
    return this.usersService.getUsers({ livestockId }, UserSelectInput.select)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'Detalles del usuario encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del usuario debe ser un numero valio'),
    )
    id: number,
  ) {
    return this.usersService.findId(+id)
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'El usuario ha sido actualizado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  update(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del usuario debe ser un numero valio'),
    )
    id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto, UserSelectInput.select)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiResponse({ status: 200, description: 'El usuario ha sido eliminado.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  remove(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del usuario debe ser un numero valio'),
    )
    id: number,
  ) {
    return this.usersService.remove(id)
  }
}
