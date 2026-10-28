import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = [
    { username: 'admin', email: 'admin@example.com', role: UserRole.admin },
    { username: 'alice', email: 'alice@example.com', role: UserRole.user },
    { username: 'bob', email: 'bob@example.com', role: UserRole.user },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { username: u.username },
      update: {},
      create: {
        ...u,
        // FAKE hash: login does not exist yet (Phase 2 replaces this)
        passwordHash: 'FAKE_HASH_DO_NOT_USE',
        profile: { create: { displayName: u.username } },
      },
    });
  }
  console.log('Seed done');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
