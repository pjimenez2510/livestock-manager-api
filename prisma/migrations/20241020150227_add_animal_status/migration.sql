-- CreateEnum
CREATE TYPE "StatusAnimal" AS ENUM ('ALIVE', 'SOLD', 'DECEASED', 'LOST');

-- AlterTable
ALTER TABLE "animals" ADD COLUMN     "status" "StatusAnimal" NOT NULL DEFAULT 'ALIVE';
