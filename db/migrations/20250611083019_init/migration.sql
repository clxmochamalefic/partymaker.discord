/*
  Warnings:

  - You are about to drop the `mGuild` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `ownerUserId` on the `tEvent` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `tEventParticipant` table. All the data in the column will be lost.
  - Added the required column `ownerProfileId` to the `tEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mProfileId` to the `tEventParticipant` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "mGuild";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "mUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mProfile" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "server" TEXT NOT NULL
);
INSERT INTO "new_mProfile" ("guildId", "id", "name", "server", "userId") SELECT "guildId", "id", "name", "server", "userId" FROM "mProfile";
DROP TABLE "mProfile";
ALTER TABLE "new_mProfile" RENAME TO "mProfile";
CREATE UNIQUE INDEX "mProfile_guildId_userId_key" ON "mProfile"("guildId", "userId");
CREATE TABLE "new_tEvent" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "guildId" TEXT NOT NULL,
    "ownerProfileId" BIGINT NOT NULL,
    "beginDateTime" DATETIME NOT NULL,
    "endDateTime" DATETIME NOT NULL,
    CONSTRAINT "tEvent_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "mProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tEvent" ("beginDateTime", "endDateTime", "guildId", "id") SELECT "beginDateTime", "endDateTime", "guildId", "id" FROM "tEvent";
DROP TABLE "tEvent";
ALTER TABLE "new_tEvent" RENAME TO "tEvent";
CREATE TABLE "new_tEventParticipant" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "eventId" BIGINT NOT NULL,
    "mProfileId" BIGINT NOT NULL,
    CONSTRAINT "tEventParticipant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "tEvent" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tEventParticipant_mProfileId_fkey" FOREIGN KEY ("mProfileId") REFERENCES "mProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tEventParticipant" ("eventId", "id") SELECT "eventId", "id" FROM "tEventParticipant";
DROP TABLE "tEventParticipant";
ALTER TABLE "new_tEventParticipant" RENAME TO "tEventParticipant";
CREATE UNIQUE INDEX "tEventParticipant_eventId_mProfileId_key" ON "tEventParticipant"("eventId", "mProfileId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
