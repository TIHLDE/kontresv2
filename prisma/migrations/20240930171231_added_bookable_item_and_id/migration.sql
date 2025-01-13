/*
  Warnings:

  - Added the required column `bookableItemId` to the `FAQ` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FAQ" ADD COLUMN     "bookableItemId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "FAQ" ADD CONSTRAINT "FAQ_bookableItemId_fkey" FOREIGN KEY ("bookableItemId") REFERENCES "BookableItem"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;
