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
  const testPass = process.env.TEST_PASS;
  if (!testPass) {
    throw new Error("TEST_PASS environment variable must be defined");
  }

  try {
    // update admin
    await client.user.update({
      where: { id: adminId },
      data: {
        password: await hash(adminPassword, bcryptSalt),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        roles: ["Admin"],
      },
    });
    // Users by roles
    const defaultRoles = ['Reader', 'Moderator', 'Writer']
    for (const role of defaultRoles) {
      const existingUser = await client.user.findUnique({
        where: { username: role },
      });
    
      const hashedPass = await hash(testPass, bcryptSalt); // consider using a more secure password
      const data = {
        username: role,
        password: hashedPass,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        roles: [role],
      };
    
      if (existingUser) {
        await client.user.update({
          where: { username: role },
          data: { password: hashedPass, roles: [role] },
        });
      } else {
        await client.user.create({
          data,
        });
      }
    }

    const maxLimit = 50;
    // Seed products
    // Count existing products
    const existingProductCount = await client.product.count();
    console.info(existingProductCount, "existingProductCount");
    const remainingProductSlots = maxLimit - existingProductCount;

    for (let i = 0; i < remainingProductSlots; i++) {
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
    const existingRecipeCount = await client.recipe.count();
    console.info(existingRecipeCount, "existingRecipeCount");
    const remainingRecipeSlots = maxLimit - existingRecipeCount;
    for (let i = 0; i < remainingRecipeSlots; i++) {
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