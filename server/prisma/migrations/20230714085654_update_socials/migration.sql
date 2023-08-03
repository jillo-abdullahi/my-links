/*
  Warnings:

  - You are about to drop the column `socialLinks` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "socialLinks",
ADD COLUMN     "facebookLink" TEXT,
ADD COLUMN     "githubLink" TEXT,
ADD COLUMN     "instagramLink" TEXT,
ADD COLUMN     "linkedinLink" TEXT,
ADD COLUMN     "personalWebsiteLink" TEXT,
ADD COLUMN     "twitterLink" TEXT,
ADD COLUMN     "youtubeLink" TEXT;
