/*
  Warnings:

  - You are about to drop the column `livestockId` on the `farms` table. All the data in the column will be lost.
  - You are about to drop the column `livestockId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `livestockId` on the `vaccines` table. All the data in the column will be lost.
  - You are about to drop the `livestocks` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `farms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "farms" DROP CONSTRAINT "farms_livestockId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_livestockId_fkey";

-- DropForeignKey
ALTER TABLE "vaccines" DROP CONSTRAINT "vaccines_livestockId_fkey";

-- AlterTable
ALTER TABLE "farms" DROP COLUMN "livestockId",
ADD COLUMN     "address" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "livestockId";

-- AlterTable
ALTER TABLE "vaccines" DROP COLUMN "livestockId";

-- DropTable
DROP TABLE "livestocks";
