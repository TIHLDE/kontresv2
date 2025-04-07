/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BookableItem" DROP CONSTRAINT "BookableItem_groupId_fkey";

-- DropTable
DROP TABLE "Group";
