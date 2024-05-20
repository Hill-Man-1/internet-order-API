/*
  Warnings:

  - Made the column `total_handling` on table `Teknisi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Teknisi" ALTER COLUMN "total_handling" SET NOT NULL,
ALTER COLUMN "total_handling" SET DEFAULT 0;
