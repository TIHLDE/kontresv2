/*
  Warnings:

  - The values [CONFIRMED,CANCELLED] on the enum `ReservationState` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `approvedBy` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Reservation` table. All the data in the column will be lost.
  - Added the required column `authorId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ReservationState_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "Reservation" ALTER COLUMN "state" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "ReservationState_new" USING ("status"::text::"ReservationState_new");
ALTER TYPE "ReservationState" RENAME TO "ReservationState_old";
ALTER TYPE "ReservationState_new" RENAME TO "ReservationState";
DROP TYPE "ReservationState_old";
COMMIT;

-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "approvedBy",
DROP COLUMN "author",
DROP COLUMN "group",
DROP COLUMN "state",
ADD COLUMN     "approvedById" TEXT,
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "groupId" TEXT NOT NULL,
ADD COLUMN     "status" "ReservationState" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "soberWatch" DROP NOT NULL;
