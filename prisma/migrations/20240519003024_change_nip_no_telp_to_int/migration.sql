/*
  Warnings:

  - Changed the type of `nip` on the `Teknisi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `no_telp` on the `Teknisi` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `total_handling` on table `Teknisi` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Teknisi" DROP COLUMN "nip",
ADD COLUMN     "nip" INTEGER NOT NULL,
DROP COLUMN "no_telp",
ADD COLUMN     "no_telp" INTEGER NOT NULL,
ALTER COLUMN "total_handling" SET NOT NULL;
