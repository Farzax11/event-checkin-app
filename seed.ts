import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com',
    },
  });

  await prisma.event.create({
    data: {
      name: 'Tech Conference',
      location: 'Bangalore',
      startTime: new Date(),
      userId: user.id,
    },
  });
}

main()
  .then(() => {
    console.log('Seed data inserted');
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
