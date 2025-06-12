import { PrismaClient } from '@/generated/prisma/client'

export async function getProfileFirstByUserIdAndGuildId(userId: string, guildId: string) {
  const prisma = new PrismaClient();
  return await prisma.mProfile.findFirst({
    where: {
      userId: userId,
      guildId: guildId,
    },
  });
}

export async function upsert(
  userId: string,
  guildId: string,
  name: string,
  server: string
) {
  const prisma = new PrismaClient();
  return await prisma.mProfile.upsert({
    where: {
      guildId_userId: {
        userId,
        guildId,
      },
    },
    update: {
      name: name,
      server: server,
    },
    create: {
      userId: userId,
      guildId: guildId,
      name: name,
      server: server,
    }
  });
}
