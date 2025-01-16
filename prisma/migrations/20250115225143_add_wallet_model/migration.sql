-- CreateTable
CREATE TABLE "Wallet" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_phoneNumber_key" ON "Wallet"("phoneNumber");
