import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { TransformInterceptor } from './common/interceptors/transform'
import { HttpExceptionFilter } from './common/filters/http-exception'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { PrismaClientExceptionFilter } from './common/filters/prisma-exception'
import { EventsBackgroundService } from './modules/events/events.background.service'

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
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Livestock API')
      .addBearerAuth()
      .addSecurityRequirements('bearer')
      .setDescription('API to manage livestock')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup('api', app, document)
  }

  const eventsBackgroundService = app.get(EventsBackgroundService)

  const now = new Date()
  const secondsUntilNextMinute = 60 - now.getSeconds()
  const msUntilNextMinute = secondsUntilNextMinute * 1000

  Logger.log(`El intervalo comenzará en ${secondsUntilNextMinute} segundos.`)

  setTimeout(() => {
    Logger.log(
      'Iniciando intervalo para verificar eventos cada minuto en el segundo 0.',
    )

    setInterval(async () => {
      Logger.log('Checking events')
      try {
        await eventsBackgroundService.checkEvents()
      } catch (error) {
        Logger.error('Error while checking events', error)
      }
    }, 60000)
  }, msUntilNextMinute)

  app.enableCors({ origin: '*' })
  const port = process.env.PORT || 3002
  Logger.log(`App is ready and listening on port ${port} 🚀`)
  await app.listen(port)
}
bootstrap()
