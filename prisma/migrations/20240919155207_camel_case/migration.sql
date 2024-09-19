-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "BookableItem" (
    "itemId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "allowsAlcohol" BOOLEAN NOT NULL,
    "groupId" TEXT NOT NULL,

    CONSTRAINT "BookableItem_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "resservation_id" SERIAL NOT NULL,
    "author" TEXT NOT NULL,
    "bookableItemId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "state" "ReservationState" NOT NULL DEFAULT 'PENDING',
    "description" TEXT NOT NULL,
    "acceptedRules" BOOLEAN NOT NULL,
    "group" TEXT NOT NULL,
    "servesAlcohol" BOOLEAN NOT NULL,
    "soberWatch" TEXT NOT NULL,
    "approvedBy" TEXT NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("resservation_id")
);

-- CreateIndex
CREATE INDEX "BookableItem_name_idx" ON "BookableItem"("name");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_bookableItemId_fkey" FOREIGN KEY ("bookableItemId") REFERENCES "BookableItem"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
