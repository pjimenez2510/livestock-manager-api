import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common'

import { Request } from 'express'
import { AuthService } from './auth.service'
import { Public } from './strategies/public.strategy'
import { SignInDto } from './dto/sign-in.dto'
import { ApiOperation, ApiResponse, ApiBody, ApiTags } from '@nestjs/swagger'
import { AuthGuard } from './guards/auth.guard'
import { TokenResponse } from './dto/token-response.dto'
import { SignUpDto } from './dto/sign-up.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión' })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido autenticado',
  })
  @ApiBody({ type: SignInDto })
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({
    status: 200,
    description: 'El usuario ha sido creado',
  })
  @ApiBody({ type: SignUpDto })
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto)
  }

  @Public()
  @Get('logout')
  logout(@Req() request: Request): Promise<any> {
    return this.authService.logout(request)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Validación del token' })
  @ApiResponse({
    status: 200,
    description: 'El token ha sido validado',
    schema: {
      type: 'object',
      properties: {
        isValid: {
          type: 'boolean',
        },
        message: {
          type: 'string',
          nullable: true,
        },
      },
    },
  })
  @Get('validate-token')
  validateToken(@Req() request: Request): TokenResponse {
    return this.authService.validateToken(request)
  }
}
