-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerifyTokenResendTime" TIMESTAMP(3),
ADD COLUMN     "passwordResetTokenResendTime" TIMESTAMP(3);
