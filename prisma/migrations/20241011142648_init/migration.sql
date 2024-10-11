-- CreateTable
CREATE TABLE "Console" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "games_count" INTEGER NOT NULL,

    CONSTRAINT "Console_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "released" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_gameConsoles" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_gameConsoles_AB_unique" ON "_gameConsoles"("A", "B");

-- CreateIndex
CREATE INDEX "_gameConsoles_B_index" ON "_gameConsoles"("B");

-- AddForeignKey
ALTER TABLE "_gameConsoles" ADD CONSTRAINT "_gameConsoles_A_fkey" FOREIGN KEY ("A") REFERENCES "Console"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_gameConsoles" ADD CONSTRAINT "_gameConsoles_B_fkey" FOREIGN KEY ("B") REFERENCES "Game"("id") ON DELETE CASCADE ON UPDATE CASCADE;
