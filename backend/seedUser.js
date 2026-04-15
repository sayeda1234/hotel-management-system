const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/userModel"); // Adjust path if needed
require("dotenv").config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash("test123", 10);

    const user = await User.create({
      name: "Test User",
      email: "testuser@example.com",
      password: hashedPassword,
      isAdmin: false,
    });

    console.log("User created:", user);
    process.exit();
  } catch (err) {
    console.error("Error seeding user:", err);
    process.exit(1);
  }
};

seedUser();
