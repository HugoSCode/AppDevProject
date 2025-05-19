import fs from 'fs';
import prisma from '../prisma/client.js'; // Adjust path if needed
import { validatePostUser } from '../middleware/validation/user.js'; // Adjust path to your validation file


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

  validatePostUser(req, res, () => {}); // Pass an empty function since we're not using next()
};

const seedAdminUsers = async () => {
  try {

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

   
    const validatedUsers = adminUsersData.map((user) => {
      validateUser(user); 
      return { ...user }; 
    });

    
    await prisma.user.createMany({
      data: validatedUsers,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log('Admin users successfully seeded');
  } catch (err) {
    console.log('Seeding failed:', err.message);
  } 
};

seedAdminUsers();
