import fetch from "node-fetch";
import prisma from "../prisma/client.js";
import { validatePostUser } from "../middleware/validation/user.js"; 
import bcrypt from "bcryptjs";

await prisma.user.deleteMany();
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

const seedSuperAdminUsersFromGitHub = async () => {
  try {
    const gistUrl = "https://gist.githubusercontent.com/HugoSCode/1ec4798822b5d2d604edc9c69eaf6075/raw/cb88951d4568f57de148aa1d74d54d0fc8985848/gistfile1.txt"; // Replace <GIST_RAW_URL> with the raw URL of your GitHub Gist
    const response = await fetch(gistUrl);
    const superAdminUsersData = await response.json();

    const data = await Promise.all(
      superAdminUsersData.map(async (user) => {
        validateUser(user); 

        const hashedPassword = await bcrypt.hash(user.password, 10);
        return{
          ...user,
          password: hashedPassword,
        };
      })
    );

    await prisma.user.createMany({
      data: data,
      skipDuplicates: true, // Prevent duplicate entries if the email already exists
    });

    console.log("Super Admin users successfully seeded from GitHub Gist");
  } catch (err) {
    console.log("Seeding failed:", err.message);
  } 
};

seedSuperAdminUsersFromGitHub();
