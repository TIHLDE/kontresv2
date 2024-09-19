/*
  Warnings:

  - The primary key for the `Reservation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `resservation_id` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP CONSTRAINT "Reservation_pkey",
DROP COLUMN "resservation_id",
ADD COLUMN     "reservationId" SERIAL NOT NULL,
ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationId");
