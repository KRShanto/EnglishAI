import { PrismaClient } from "@prisma/client";
import "server-only";

export const db = new PrismaClient();
