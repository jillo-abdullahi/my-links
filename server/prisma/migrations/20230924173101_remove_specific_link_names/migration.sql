/*
  Warnings:

  - You are about to drop the column `CodepenLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `FrontendMentorLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `GitlabLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `HashnodeLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `TwitchLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `codeWarsLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `devToLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `facebookLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `freeCodeCampLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `githubLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `linkedinLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `personalWebsiteLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `stackoverflowLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `xLink` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeLink` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "CodepenLink",
DROP COLUMN "FrontendMentorLink",
DROP COLUMN "GitlabLink",
DROP COLUMN "HashnodeLink",
DROP COLUMN "TwitchLink",
DROP COLUMN "codeWarsLink",
DROP COLUMN "devToLink",
DROP COLUMN "facebookLink",
DROP COLUMN "freeCodeCampLink",
DROP COLUMN "githubLink",
DROP COLUMN "linkedinLink",
DROP COLUMN "personalWebsiteLink",
DROP COLUMN "stackoverflowLink",
DROP COLUMN "xLink",
DROP COLUMN "youtubeLink";
