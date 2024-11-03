/*
  Warnings:

  - Added the required column `sex` to the `animals` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AnimalSex" AS ENUM ('MALE', 'FEMALE');

-- AlterTable
ALTER TABLE "animals" ADD COLUMN     "sex" "AnimalSex" NOT NULL;
