import { PrismaClient } from "../../prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var __prisma: InstanceType<typeof PrismaClient> | undefined;
}

function getPrismaClient() {
  if (!global.__prisma) {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });
    global.__prisma = new PrismaClient({ adapter });
  }
  return global.__prisma;
}

export const db = getPrismaClient();
