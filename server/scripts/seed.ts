import * as dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { customSeed } from "./customSeed";
import { Salt, parseSalt } from "../src/auth/password.service";
import { hash } from "bcrypt";

if (require.main === module) {
  dotenv.config();

  const { BCRYPT_SALT } = process.env;
  if (!BCRYPT_SALT) {
    throw new Error("BCRYPT_SALT environment variable must be defined");
  }
  const salt = parseSalt(BCRYPT_SALT);
  seed(salt).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

async function seed(bcryptSalt: Salt) {
  const client = new PrismaClient();
  try {
    console.info("Seeding database...");
    const data = {
      username: "admin",
      password: await hash("admin", bcryptSalt),
      roles: ["user"],
    };

    await client.user.upsert({
      where: { username: data.username },
      update: {},
      create: data,
    });
    console.info("Seeding database with custom seed...");
    await customSeed();
    console.info("Seeded database successfully");
  } catch (error) {
    console.error(`Error in seed: ${error}`);
  } finally {
    await client.$disconnect();
  }
}