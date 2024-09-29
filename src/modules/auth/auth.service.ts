import {
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { compareSync } from 'bcrypt'
import { TokenResponse } from './dto/token-response.dto'
import { UsersService } from '../users/users.service'
import { UserSelectInput } from '../users/constants/user-select'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  private comparePassword(password: string, userPassword: string): boolean {
    return compareSync(password, userPassword)
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userService.getUser({ username })

    if (user && this.comparePassword(pass, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async signIn(username: string, pass: string) {
    const user = await this.userService.getUser(
      { username },
      { ...UserSelectInput.select, password: true },
    )

    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas')
    }

    if (!this.comparePassword(pass, user.password)) {
      throw new UnauthorizedException('Credenciales inválidas')
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user

    return {
      access_token: await this.jwtService.signAsync(result),
    }
  }

  async signUp(payload: CreateUserDto) {
    const user = await this.userService.create(payload, UserSelectInput.select)
    return {
      access_token: await this.jwtService.signAsync(user),
    }
  }

  async logout(@Req() request: Request): Promise<any> {
    request['user'] = null
    return {
      message: 'Sesión cerrada',
      statusCode: HttpStatus.OK,
    }
  }

  validateToken(req: Request): TokenResponse {
    try {
      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return {
          isValid: false,
          message: 'Inicie sesión para continuar',
        }
      }

      const payload = this.jwtService.verify(token)

      if (!payload) {
        return {
          isValid: false,
          message: 'Token inválido',
        }
      }

      return { isValid: true }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        isValid: false,
        message: 'Token inválido',
      }
    }
  }
}
