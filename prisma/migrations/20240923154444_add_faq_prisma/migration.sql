-- CreateTable
CREATE TABLE "FAQ" (
    "questionId" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("questionId")
);
