import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { Prisma, Role, Subscription } from '@prisma/client'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { CryptoService } from '../crypto/crypto.service'

@Injectable()
export class SubscriptionsService {
  private readonly logger = new Logger(SubscriptionsService.name)
  constructor(
    private readonly prisma: PrismaService,
    private readonly cryptoService: CryptoService,
  ) {}

  async subscription(
    params: Prisma.SubscriptionWhereUniqueInput,
  ): Promise<Subscription | null> {
    return await this.prisma.subscription.findUnique({
      where: params,
    })
  }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const encriptedEndpoint = await this.cryptoService.encryptString(
      createSubscriptionDto.token,
    )

    const subscriptions = await this.findAllByUser(createSubscriptionDto.userId)
    if (subscriptions.length > 0) {
      const promise = subscriptions.map(async (subscription) => {
        const decrypted = await this.cryptoService.decryptString(
          subscription.token,
        )
        if (decrypted === createSubscriptionDto.token) {
          throw new ConflictException('Las notificaciones ya están activadas')
        }
        return subscription
      })

      await Promise.all(promise)
    }

    const subscriptionTokenAlreadyExists =
      await this.prisma.subscription.findFirst({
        where: { token: encriptedEndpoint },
      })

    if (subscriptionTokenAlreadyExists) {
      throw new ConflictException('Las notificaciones ya están activadas')
    }

    const subscription = await this.prisma.subscription.create({
      data: {
        userId: createSubscriptionDto.userId,
        token: encriptedEndpoint,
      },
    })

    return {
      id: subscription.id,
      userId: subscription.userId,
      available: subscription.available,
    }
  }

  async update(id: number, UpdateSubscriptionDto: UpdateSubscriptionDto) {
    const subscription = await this.findOne(id)

    if (!subscription) {
      throw new NotFoundException('La subscripción no existe')
    }

    const subscriptionUpdated = await this.prisma.subscription.update({
      where: { id },
      data: UpdateSubscriptionDto,
    })

    return {
      id: subscriptionUpdated.id,
      userId: subscriptionUpdated.userId,
      available: subscriptionUpdated.available,
    }
  }

  async findAllByUser(userId: number): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({
      where: {
        userId,
      },
    })
  }

  async findAll(
    where?: Prisma.SubscriptionWhereInput,
  ): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({ where })
  }

  async findByRoles(userRoles: Role[]): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({
      where: {
        user: {
          role: {
            in: userRoles,
          },
        },
        available: true,
      },
    })
  }

  async findOne(
    id: number,
  ): Promise<{ id: number; userId: number; available: boolean }> {
    const subscription = await this.subscription({ id })

    if (!subscription) {
      throw new NotFoundException('La subscripción no existe')
    }

    return {
      id: subscription.id,
      userId: subscription.userId,
      available: subscription.available,
    }
  }

  async deleteSubscription(token: string) {
    try {
      const subscription = await this.prisma.subscription.findFirst({
        where: { token },
      })

      if (!subscription) {
        throw new NotFoundException('La subscripción no existe')
      }

      await this.prisma.subscription.delete({
        where: { id: subscription.id },
      })
    } catch (error) {
      this.logger.error(error)
    }
  }

  async disableSubscriptionsByUser(userId: number) {
    return await this.prisma.subscription.updateMany({
      where: { userId },
      data: { available: false },
    })
  }
}
