import { Purpose } from '@prisma/client'

export interface FilterParams {
  name?: string
  purpose?: Purpose
  dimension?: number
  farmId?: number
}
