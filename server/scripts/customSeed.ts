import { PrismaClient } from "@prisma/client";

export async function customSeed() {
  const client = new PrismaClient();
  try {
    const username = "admin";
    await client.user.update({
      where: { username: username },
      data: { username },
    });
  } catch (error) {
    console.error(`Error in customSeed: ${error}`);
  } finally {
    await client.$disconnect();
  }
}