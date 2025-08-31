import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // No logging to keep console clean
    log: [],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
