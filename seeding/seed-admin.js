import fs from 'fs';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js';
import { validatePostUser } from '../middleware/validation/user.js';

const validateUser = (user) => {
  const req = { body: user };
  const res = {
    status: (code) => ({
      json: (message) => {
        console.log(message.message);
        process.exit(1);
      },
    }),
  };

  validatePostUser(req, res, () => { });
};

const seedAdminUsers = async () => {
  try {
    await prisma.user.deleteMany();
    const adminUsersData = [
      {
        username: "johnDoe",
        email: "admin1@example.com",
        password: "password123",
        role: "ADMIN"
      },
      {
        username: "janeDoe",
        email: "admin2@example.com",
        password: "password456",
        role: "ADMIN"
      },
      {
        username: "jimDoe",
        email: "admin3@example.com",
        password: "password789",
        role: "ADMIN"
      },
      {
        username: "joshDoe",
        email: "admin4@example.com",
        password: "password101",
        role: "ADMIN"
      },
      {
        username: "jasonDoe",
        email: "admin5@example.com",
        password: "password202",
        role: "ADMIN"
      }
    ];

    const validatedUsers = await Promise.all(
      adminUsersData.map(async (user) => {
        validateUser(user);

        const hashedPassword = await bcrypt.hash(user.password, 10);

        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    await prisma.user.createMany({
      data: validatedUsers,
      skipDuplicates: true,
    });

    console.log('Admin users successfully seeded');
  } catch (err) {
    console.log('Seeding failed:', err.message);
  }
};

seedAdminUsers();
