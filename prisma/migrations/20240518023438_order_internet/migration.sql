-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'TEKNISI', 'ADMIN');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teknisi" (
    "id" BIGSERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "no_telp" TEXT NOT NULL,
    "total_handling" INTEGER NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "Teknisi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "upload_identity" TEXT NOT NULL,
    "kota" TEXT NOT NULL,
    "kecamatan" TEXT NOT NULL,
    "jalan" TEXT NOT NULL,
    "reject_reason" TEXT,
    "user_id" BIGINT NOT NULL,
    "package_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL DEFAULT 2,
    "teknisi_id" BIGINT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "harga" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Teknisi_user_id_key" ON "Teknisi"("user_id");

-- AddForeignKey
ALTER TABLE "Teknisi" ADD CONSTRAINT "Teknisi_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_teknisi_id_fkey" FOREIGN KEY ("teknisi_id") REFERENCES "Teknisi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
