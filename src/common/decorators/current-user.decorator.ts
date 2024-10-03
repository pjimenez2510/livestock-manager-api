import { createParamDecorator } from '@nestjs/common'
import { User } from '@prisma/client'

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: any) => ctx.switchToHttp().getRequest().user as User,
)
