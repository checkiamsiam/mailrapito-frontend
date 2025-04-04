import { PrismaClient } from "@prisma/client";
declare let global: { prisma: PrismaClient };

let prisma: PrismaClient;

if (process.env.NODE_ENV === "development") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  prisma = global.prisma;
}

export { prisma as db };
