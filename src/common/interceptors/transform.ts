import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Response } from 'express'

export interface StandardResponse<T> {
  status: number
  data: T
  metadata: {
    timestamp: string
    path: string
  }
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, StandardResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    const ctx = context.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    return next.handle().pipe(
      map((data) => ({
        status: response.statusCode,
        data: data,
        metadata: {
          timestamp: new Date().toISOString(),
          path: request.url,
        },
      })),
    )
  }
}
