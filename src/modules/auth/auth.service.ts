import {
  HttpStatus,
  Injectable,
  Req,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { compareSync } from 'bcrypt'
import { TokenResponse } from './dto/token-response.dto'
import { UsersService } from '../users/users.service'
import { CreateUserDto } from '../users/dto/create-user.dto'

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
    const user = await this.validateUser(username, pass)
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas')
    }
    return {
      access_token: await this.jwtService.signAsync(user),
      user: user,
    }
  }

  async signUp(payload: CreateUserDto) {
    const user = await this.userService.create(payload)
    const access_token = await this.jwtService.signAsync(user)
    return { access_token, user }
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
