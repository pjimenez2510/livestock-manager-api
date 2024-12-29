import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { SubscriptionsService } from './subscriptions.service'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'

@ApiTags('Subscripciones')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva subscripcion' })
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return await this.subscriptionsService.create(createSubscriptionDto)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una subscripcion por el id' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.subscriptionsService.findOne(id)
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las subscripciones' })
  async findAll() {
    return await this.subscriptionsService.findAll()
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar subscripciones' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ) {
    return await this.subscriptionsService.update(id, updateSubscriptionDto)
  }
}
