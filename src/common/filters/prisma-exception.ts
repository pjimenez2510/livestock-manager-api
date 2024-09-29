/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { Response } from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  private readonly errorHandlers: Record<
    string,
    (exception: Prisma.PrismaClientKnownRequestError) => {
      statusCode: number
      message: string[]
      error: string
    }
  > = {
    P2002: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.CONFLICT,
      message: [
        `Entrada duplicada detectada en el campo ${exception.meta?.target}`,
      ],
      error: 'Conflicto',
    }),

    P2003: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        `Violación de restricción de clave externa en el campo ${exception.meta?.field_name}`,
      ],
      error: 'Clave externa inválida',
    }),

    P2025: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.NOT_FOUND,
      message: [
        `El recurso no fue encontrado para el parámetro de búsqueda en ${exception.meta?.modelName}`,
      ],
      error: 'No encontrado',
    }),

    P2016: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['El registro solicitado no existe en la base de datos'],
      error: 'Registro no encontrado',
    }),

    P2011: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['Valores null no permitidos en los campos especificados'],
      error: 'Campos no válidos',
    }),

    P2017: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'La consulta resultó en múltiples registros, cuando se esperaba solo uno',
      ],
      error: 'Resultado inesperado',
    }),

    P1000: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: ['Autenticación fallida en la base de datos'],
      error: 'Conexión fallida',
    }),

    P1001: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.SERVICE_UNAVAILABLE,
      message: [
        'No se pudo conectar a la base de datos antes de que se agotara el tiempo de espera',
      ],
      error: 'Timeout en la conexión',
    }),

    P1010: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['Error en la URL de conexión a la base de datos'],
      error: 'URL de conexión inválida',
    }),

    P2036: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ['La transacción falló debido a un error inesperado'],
      error: 'Error de transacción',
    }),

    P2014: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'La modificación de varias tablas falló debido a una violación de integridad referencial',
      ],
      error: 'Integridad referencial',
    }),

    P2004: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'Consulta fallida debido a que se encontraron datos incorrectos en la base de datos',
      ],
      error: 'Datos incorrectos',
    }),

    P2005: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [`El valor proporcionado para el campo es inválido`],
      error: 'Valor no válido',
    }),

    P2006: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['El valor proporcionado para un campo específico no es válido'],
      error: 'Valor inválido',
    }),

    P2007: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['Los datos proporcionados son inválidos para esta operación'],
      error: 'Datos inválidos',
    }),

    P2008: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: ['Fallo en la interpretación de la consulta'],
      error: 'Error de interpretación',
    }),

    P2009: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: [
        'La consulta enviada al servidor de base de datos no es válida',
      ],
      error: 'Consulta inválida',
    }),

    P2012: (exception: Prisma.PrismaClientKnownRequestError) => ({
      statusCode: HttpStatus.BAD_REQUEST,
      message: ['La consulta especifica campos mutualmente excluyentes'],
      error: 'Campos no compatibles',
    }),
  }

  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    console.log(exception)
    const handler = this.errorHandlers[exception.code]
    const { statusCode, message, error } = handler
      ? handler(exception)
      : {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Ocurrió un error inesperado',
          error: 'Error en el servidor',
        }

    response.status(statusCode).json({
      statusCode,
      error,
      message,
      path: request.url,
      timestamp: new Date(),
    })
  }
}
