/*
  Warnings:

  - You are about to drop the column `instagramLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `mediumLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `threadsLink` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "instagramLink",
DROP COLUMN "mediumLink",
DROP COLUMN "threadsLink",
ADD COLUMN     "CodepenLink" TEXT,
ADD COLUMN     "FrontendMentorLink" TEXT,
ADD COLUMN     "GitlabLink" TEXT,
ADD COLUMN     "HashnodeLink" TEXT,
ADD COLUMN     "TwitchLink" TEXT;
