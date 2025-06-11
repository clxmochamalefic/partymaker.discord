-- CreateTable
CREATE TABLE "mGuild" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mUser" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "mProfile" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "guildId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "server" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tEvent" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "guildId" BIGINT NOT NULL,
    "ownerUserId" BIGINT NOT NULL,
    "beginDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "tEventParticipant" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "eventId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "mProfile_guildId_userId_key" ON "mProfile"("guildId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "tEventParticipant_eventId_userId_key" ON "tEventParticipant"("eventId", "userId");
