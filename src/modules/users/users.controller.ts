import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ParseIntWithMessagePipe } from 'src/common/pipes/parse-int-with-message'
import { UserSelectInput } from './constants/user-select'

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto, UserSelectInput.select)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios por ganadería' })
  findAll() {
    return this.usersService.getUsers({}, UserSelectInput.select)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  findOne(
    @Param(
      'id',
      new ParseIntWithMessagePipe('El Id del usuario debe ser un numero valio'),
    )
    id: number,
  ) {
    return this.usersService.getUser(
      {
        id,
      },
      UserSelectInput.select,
    )
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', type: String })
  @ApiBody({ type: UpdateUserDto })
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
