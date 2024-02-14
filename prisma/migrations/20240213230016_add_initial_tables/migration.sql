-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cidadeId" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cidade" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Cidade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pessoa" ADD CONSTRAINT "Pessoa_cidadeId_fkey" FOREIGN KEY ("cidadeId") REFERENCES "Cidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
