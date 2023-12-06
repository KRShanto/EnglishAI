/*
  Warnings:

  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "message",
ADD COLUMN     "msg" JSONB;
