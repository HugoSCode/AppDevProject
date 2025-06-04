import fs from 'fs';
import csv from 'csv-parser';
import bcrypt from 'bcryptjs';
import prisma from '../prisma/client.js'; // Adjust path if needed
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
  validatePostUser(req, res, () => { }); // Pass an empty function since we're not using next()
};

async function seedUsers() {
  const users = [];

  // Read the CSV file and store users in an array
  fs.createReadStream('seed-normal.csv')
    .pipe(csv())
    .on('data', (row) => {
      users.push({
        username: row.username,
        email: row.email,
        password: row.password,
        role: row.role.toUpperCase(),
      });
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');

      const validatedUsers = await Promise.all(
        users.map(async (user) => {
          validateUser(user);

          const hashedPassword = await bcrypt.hash(user.password, 10);

          return {
            ...user,
            password: hashedPassword,
          };
        })
      );

      for (const user of validatedUsers) {
        try {

          const createdUser = await prisma.user.create({
            data: user,
          });
          console.log('User created:', createdUser);
        } catch (error) {
          console.error('Error creating user:', error);
        }
      }

    });
}

seedUsers();
