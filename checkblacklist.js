import prisma from './prisma/client.js'; // adjust the path if your prisma client is somewhere else

async function showBlacklist() {
  const tokens = await prisma.blacklist.findMany();
  console.log(tokens);
}

showBlacklist()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
