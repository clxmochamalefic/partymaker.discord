-- CreateTable
CREATE TABLE "mProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "server" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "ownerProfileId" INTEGER NOT NULL,
    "beginDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL,
    CONSTRAINT "tEvent_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "mProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "tEventParticipant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" INTEGER NOT NULL,
    "mProfileId" INTEGER NOT NULL,
    CONSTRAINT "tEventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "tEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tEventParticipant_mProfileId_fkey" FOREIGN KEY ("mProfileId") REFERENCES "mProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "mProfile_guildId_userId_key" ON "mProfile"("guildId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "tEventParticipant_eventId_mProfileId_key" ON "tEventParticipant"("eventId", "mProfileId");
