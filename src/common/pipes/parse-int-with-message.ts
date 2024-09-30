import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'

@Injectable()
export class ParseIntWithMessagePipe implements PipeTransform<string, number> {
  constructor(private readonly errorMessage: string) {}
  transform(value: string): number {
    const parsedValue = parseInt(value, 10)
    if (isNaN(parsedValue)) {
      throw new BadRequestException(this.errorMessage)
    }
    return parsedValue
  }
}
