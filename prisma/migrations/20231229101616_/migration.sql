-- CreateEnum
CREATE TYPE "Risk" AS ENUM ('HIGH', 'MODERATE', 'LOW', 'UNKNOWN');

-- CreateTable
CREATE TABLE "devices" (
    "id" CHAR(8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" VARCHAR,
    "emoji" TEXT NOT NULL DEFAULT '🌊',
    "accessKey" TEXT NOT NULL,
    "ownerId" CHAR(8),
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "batteryLevel" INTEGER,
    "lat" DOUBLE PRECISION,
    "long" DOUBLE PRECISION,
    "ph" DOUBLE PRECISION,
    "tds" INTEGER,
    "waterTemperature" DOUBLE PRECISION,
    "turbidity" INTEGER,
    "risk" "Risk" NOT NULL DEFAULT 'UNKNOWN',

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "devices_id_key" ON "devices"("id");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
