import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Salt } from "../src/auth/password.service";
import { faker } from '@faker-js/faker';

export async function customSeed(bcryptSalt: Salt, adminId: string) {
  const client = new PrismaClient();
  const testPassword = process.env.TEST_PASS;

  if (!testPassword) {
    throw new Error("TEST_PASS environment variable must be defined");
  }

  try {
    // Users by roles
    const defaultRoles = ['reader', 'moderator', 'writer']
    for (const role of defaultRoles) {
      const password = await hash(testPassword, bcryptSalt)
      await client.user.upsert({
        where: { username: role },
        update: {},
        create: {
          username: role,
          password: password,
          roles: [role],
        },
      });
    }

    // Seed products
    for (let i = 0; i < 5; i++) {
      await client.product.create({
        data: {
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          itemPrice: parseFloat(faker.commerce.price()),
          Creator: adminId, // admin id from seed
        },
      });
    }

    // Seed recipes
    for (let i = 0; i < 5; i++) {
      await client.recipe.create({
        data: {
          title: faker.lorem.words(3),
          description: faker.lorem.sentences(3),
          email: faker.internet.email(),
          phone: faker.phone.number(),
          Creator: adminId, // admin id from seed
        },
      });
    }
  } catch (error) {
    console.error(`Error in customSeed: ${error}`);
  } finally {
    await client.$disconnect();
  }
}