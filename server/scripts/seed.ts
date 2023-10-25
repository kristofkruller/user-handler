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

  let adminId: string | null = null;
  try {
    // Admin user seeding 
    // one user must be seeded here because of fkey id relation
    console.info("Seeding database...");
    const data = {
      username: "admin",
      password: await hash("admin", bcryptSalt),
      firstName: "",
      lastName: "",
      roles: ["user"],
    };

    const admin = await client.user.upsert({
      where: { username: data.username },
      update: {},
      create: data,
    });

    if (admin) {
      adminId = admin.id;
    }

    if (adminId) {
      console.info("Seeding database with custom seed...");
      await customSeed(bcryptSalt, adminId);  // itt adod át az admin ID-ját
    } else {
      console.warn(`Custom seeding database was not successfull because adminId is ${typeof adminId}`);
    }
    console.info("Seeding done");

  } catch (error) {
    console.error(`Error in seeding: ${error}`);
  } finally {
    await client.$disconnect();
  }
}
