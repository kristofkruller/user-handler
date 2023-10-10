import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { Salt } from "../src/auth/password.service";
import { faker } from '@faker-js/faker';

export async function customSeed(bcryptSalt: Salt, adminId: string) {
  const client = new PrismaClient();
  if (!bcryptSalt || !adminId) throw new Error("bcryptSalt and admin id props must be passed");
  const adminPassword = process.env.ADMIN_PASS;
  if (!adminPassword) {
    throw new Error("ADMIN_PASS environment variable must be defined");
  }
  
  try {
    // update admin
    await client.user.update({
      where: { id: adminId },
      data: {
        password: await hash(adminPassword, bcryptSalt),
        roles: ["admin"],
      },
    });
    // Users by roles
    const defaultRoles = ['reader', 'moderator', 'writer']
    for (const role of defaultRoles) {
      const data = {
        username: role,
        password: await hash("Asdf1234", bcryptSalt),
        roles: [role],
      };
      await client.user.upsert({
        where: { username: data.username },
        update: {},
        create: data,
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