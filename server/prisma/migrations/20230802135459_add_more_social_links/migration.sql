/*
  Warnings:

  - You are about to drop the column `twitterLink` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "twitterLink",
ADD COLUMN     "devToLink" TEXT,
ADD COLUMN     "mediumLink" TEXT,
ADD COLUMN     "stackoverflowLink" TEXT,
ADD COLUMN     "threadsLink" TEXT,
ADD COLUMN     "xLink" TEXT;
