-- CreateEnum
CREATE TYPE "ReservationState" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

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
    "reservationId" SERIAL NOT NULL,
    "authorId" TEXT NOT NULL,
    "bookableItemId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "status" "ReservationState" NOT NULL DEFAULT 'PENDING',
    "description" TEXT NOT NULL,
    "acceptedRules" BOOLEAN NOT NULL,
    "groupId" TEXT NOT NULL,
    "servesAlcohol" BOOLEAN NOT NULL,
    "soberWatch" TEXT,
    "approvedById" TEXT,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("reservationId")
);

-- CreateIndex
CREATE INDEX "BookableItem_name_idx" ON "BookableItem"("name");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_bookableItemId_fkey" FOREIGN KEY ("bookableItemId") REFERENCES "BookableItem"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
