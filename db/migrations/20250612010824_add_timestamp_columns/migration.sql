-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mProfile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "server" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME
);
INSERT INTO "new_mProfile" ("guildId", "id", "name", "server", "userId") SELECT "guildId", "id", "name", "server", "userId" FROM "mProfile";
DROP TABLE "mProfile";
ALTER TABLE "new_mProfile" RENAME TO "mProfile";
CREATE UNIQUE INDEX "mProfile_guildId_userId_key" ON "mProfile"("guildId", "userId");
CREATE TABLE "new_tEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "ownerProfileId" INTEGER NOT NULL,
    "beginDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "tEvent_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "mProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tEvent" ("beginDateTime", "endDateTime", "guildId", "id", "ownerProfileId") SELECT "beginDateTime", "endDateTime", "guildId", "id", "ownerProfileId" FROM "tEvent";
DROP TABLE "tEvent";
ALTER TABLE "new_tEvent" RENAME TO "tEvent";
CREATE TABLE "new_tEventParticipant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" INTEGER NOT NULL,
    "mProfileId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "tEventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "tEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tEventParticipant_mProfileId_fkey" FOREIGN KEY ("mProfileId") REFERENCES "mProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tEventParticipant" ("eventId", "id", "mProfileId") SELECT "eventId", "id", "mProfileId" FROM "tEventParticipant";
DROP TABLE "tEventParticipant";
ALTER TABLE "new_tEventParticipant" RENAME TO "tEventParticipant";
CREATE UNIQUE INDEX "tEventParticipant_eventId_mProfileId_key" ON "tEventParticipant"("eventId", "mProfileId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
