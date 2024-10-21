-- DropForeignKey
ALTER TABLE "FAQ" DROP CONSTRAINT "FAQ_bookableItemId_fkey";

-- CreateTable
CREATE TABLE "_BookableItemToFAQ" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BookableItemToFAQ_AB_unique" ON "_BookableItemToFAQ"("A", "B");

-- CreateIndex
CREATE INDEX "_BookableItemToFAQ_B_index" ON "_BookableItemToFAQ"("B");

-- AddForeignKey
ALTER TABLE "_BookableItemToFAQ" ADD CONSTRAINT "_BookableItemToFAQ_A_fkey" FOREIGN KEY ("A") REFERENCES "BookableItem"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookableItemToFAQ" ADD CONSTRAINT "_BookableItemToFAQ_B_fkey" FOREIGN KEY ("B") REFERENCES "FAQ"("questionId") ON DELETE CASCADE ON UPDATE CASCADE;
