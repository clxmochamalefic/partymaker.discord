import { PrismaClient } from '@/generated/prisma/client'

export async function getEventByGuildId(guildId: string) {
  const prisma = new PrismaClient();
  return await prisma.tEvent.findMany({
    where: {
      guildId: guildId,
    },
  });
}

export async function getEventByGuildIdAndProfileId(guildId: string, profileId: number) {
  const prisma = new PrismaClient();
  return await prisma.tEvent.findMany({
    where: {
      ownerProfileId: profileId,
      guildId: guildId,
    },
  });
}

export async function upsert(
  profileId: number,
  guildId: string,
  title: string,
  beginDateTimeStr: string,
  endTerm: number,
  eventId: number | null = null
) {
  const beginDateTime = new Date(beginDateTimeStr);
  const endDateTime = new Date(beginDateTimeStr);
  endDateTime.setTime(endDateTime.getTime() + endTerm * 60 * 60 * 1000)

  const prisma = new PrismaClient();

  if (eventId === null) {
    // create
    return await prisma.tEvent.create({
      data: {
        ownerProfileId: profileId,
        guildId: guildId,
        title: title,
        beginDateTime: beginDateTime,
        endDateTime: endDateTime,
      }
    });
  }

  // update
  return await prisma.tEvent.update({
    where: {
      id: eventId
    },
    data: {
      title: title,
      beginDateTime: beginDateTime,
      endDateTime: endDateTime,
    }
  });

}

