-- CreateEnum
CREATE TYPE "IntervalType" AS ENUM ('DAY', 'MONTH', 'YEAR');

-- AlterTable
ALTER TABLE "vaccines" ADD COLUMN     "interval_type" "IntervalType" NOT NULL DEFAULT 'DAY';
