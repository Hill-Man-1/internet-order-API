/*
  Warnings:

  - You are about to drop the column `password` on the `Teknisi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Teknisi" DROP COLUMN "password",
ALTER COLUMN "total_handling" DROP NOT NULL;
