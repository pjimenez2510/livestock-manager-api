import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './common/interceptors/transform'
import { HttpExceptionFilter } from './common/filters/http-exception'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from './common/filters/prisma-exception'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  app.useGlobalFilters(new PrismaClientExceptionFilter())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new TransformInterceptor())

  const config = new DocumentBuilder()
    .setTitle('Livestock Manager')
    .setDescription('The livestock manager description')
    .setVersion('1.0')
    .addTag('Livestock')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
