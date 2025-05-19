import fs from 'fs';
import csv from 'csv-parser';
import prisma from '../prisma/client.js'; // Adjust path if needed

async function seedUsers() {
  const users = [];

  // Read the CSV file and store users in an array
  fs.createReadStream('seed-normal.csv')
    .pipe(csv())
    .on('data', (row) => {
      // Push user data into the users array, ensuring 'role' matches the enum
      users.push({
        username: row.username,
        email: row.email,
        password: row.password,  
        role: row.role.toUpperCase(), 
      });
    })
    .on('end', async () => {
      console.log('CSV file successfully processed');

      // Insert users into the database
      for (const user of users) {
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
