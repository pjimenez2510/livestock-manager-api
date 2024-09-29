import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Request } from 'express'
import { Reflector } from '@nestjs/core'
import { IS_PUBLIC_KEY } from '../strategies/public.strategy'
import { User } from '@prisma/client'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    const request = context.switchToHttp().getRequest()
    if (isPublic) {
      return true
    }

    const token = this.extractTokenFromHeader(request)
    if (!token) {
      throw new UnauthorizedException('No se encuentra autenticado')
    }
    try {
      const payload = await this.jwtService.verifyAsync<User>(token, {
        secret: process.env.JWT_SECRET,
      })
      request['user'] = payload
    } catch {
      throw new UnauthorizedException('No se encuentra autenticado')
    }
    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
