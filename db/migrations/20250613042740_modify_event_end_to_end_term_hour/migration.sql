/*
  Warnings:

  - You are about to drop the column `endDateTime` on the `tEvent` table. All the data in the column will be lost.
  - Added the required column `endTermHour` to the `tEvent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "guildId" TEXT NOT NULL,
    "ownerProfileId" INTEGER NOT NULL,
    "beginDateTime" DATETIME NOT NULL,
    "endTermHour" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    CONSTRAINT "tEvent_ownerProfileId_fkey" FOREIGN KEY ("ownerProfileId") REFERENCES "mProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tEvent" ("beginDateTime", "createdAt", "deletedAt", "guildId", "id", "ownerProfileId", "title", "updatedAt") SELECT "beginDateTime", "createdAt", "deletedAt", "guildId", "id", "ownerProfileId", "title", "updatedAt" FROM "tEvent";
DROP TABLE "tEvent";
ALTER TABLE "new_tEvent" RENAME TO "tEvent";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
