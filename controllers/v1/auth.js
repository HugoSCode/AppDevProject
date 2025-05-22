import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../../prisma/client.js";

const register = async (req, res) => {
  try {
    const { username, role, email, password } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });

    if (user) return res.status(409).json({ message: "User already exists" });

    /**
     * A salt is random bits added to a password before it is hashed. Salts
     * create unique passwords even if two users have the same passwords
     */
    const salt = await bcryptjs.genSalt();

    /**
     * Generate a hash for a given string. The first argument
     * is a string to be hashed, i.e., Pazzw0rd123 and the second
     * argument is a salt, i.e., E1F53135E559C253
     */
    const hashedPassword = await bcryptjs.hash(password, salt);

    user = await prisma.user.create({
      data: { username, role, email, password: hashedPassword },
      select: {
        // Select only the fields you want to return
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      message: "User successfully registered",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  const MAX_LOGIN_ATTEMPTS = 5;
  const LOCK_TIME_MS = 10 * 60 * 1000; // 10 minutes

  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user)
      return res.status(401).json({ message: "Invalid username" });

    if (
      user.loginAttempts >= MAX_LOGIN_ATTEMPTS &&
      user.lastLoginAttempt >= Date.now() - LOCK_TIME_MS
    ) {
      return res.status(401).json({
        message: "Maximum login attempts reached. Please try again later",
      });
    }

    /**
     * Compare the given string, i.e., Pazzw0rd123, with the given
     * hash, i.e., user's hashed password
     */
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      await prisma.user.update({
        where: { username },
        data: {
          loginAttempts: user.loginAttempts + 1,
          lastLoginAttempt: new Date(),
        },
      });

      return res.status(401).json({ message: "Invalid password" });
    }

    const { JWT_SECRET, JWT_LIFETIME } = process.env;

    /**
     * Return a JWT. The first argument is the payload, i.e., an object containing
     * the authenticated user's id and name, the second argument is the secret
     * or public/private key, and the third argument is the lifetime of the JWT
     */
  const token = jwt.sign(
  {
    id: user.id,
    username: user.username,
  },
  process.env.JWT_SECRET, // <-- make sure this isn't just `JWT_SECRET`
  { expiresIn: process.env.JWT_LIFETIME }
);


    await prisma.user.update({
      where: { username },
      data: {
        loginAttempts: 0,
        lastLoginAttempt: null,
      },
    });

    return res.status(200).json({
      message: "User successfully logged in",
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await prisma.blacklist.create({
      data: { token },
    });

    return res.status(200).json({ message: 'Successfully logged out' });
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid token' });
  }
};


export { register, login, logout };