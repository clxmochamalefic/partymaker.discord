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
