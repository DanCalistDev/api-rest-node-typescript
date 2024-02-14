// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Populando a tabela Cidade
  const cidades = [
    'Vitória',
    'Vila Velha',
    'Serra',
    'Cariacica',
    'Linhares',
    'Rio de Janeiro',
    'São Paulo',
    'Salvador',
    'Brasília',
    'Fortaleza',
  ];
  const cidadeRecords = [];
  for (const cidade of cidades) {
    const cidadeRecord = await prisma.cidade.create({
      data: {
        nome: cidade,
      },
    });
    cidadeRecords.push(cidadeRecord);
  }

  // Populando a tabela Pessoa
  const pessoas = [
    {
      nomeCompleto: 'João Silva',
      email: 'joao@gmail.com',
      cidadeId: cidadeRecords[0].id,
    },
    {
      nomeCompleto: 'Maria Santos',
      email: 'maria@gmail.com',
      cidadeId: cidadeRecords[1].id,
    },
    {
      nomeCompleto: 'Pedro Costa',
      email: 'pedro@gmail.com',
      cidadeId: cidadeRecords[2].id,
    },
    {
      nomeCompleto: 'Ana Pereira',
      email: 'ana@gmail.com',
      cidadeId: cidadeRecords[3].id,
    },
    {
      nomeCompleto: 'Luiz Souza',
      email: 'luiz@gmail.com',
      cidadeId: cidadeRecords[4].id,
    },
  ];
  for (const pessoa of pessoas) {
    await prisma.pessoa.create({
      data: pessoa,
    });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
