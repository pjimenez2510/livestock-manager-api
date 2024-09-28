import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common'

@Injectable()
export class ParseIntWithMessagePipe implements PipeTransform<string, number> {
  constructor(private readonly errorMessage: string) {}
  transform(value: string, metadata: ArgumentMetadata): number {
    const parsedValue = parseInt(value, 10)
    console.log(metadata)
    if (isNaN(parsedValue)) {
      throw new BadRequestException(this.errorMessage)
    }
    return parsedValue
  }
}
