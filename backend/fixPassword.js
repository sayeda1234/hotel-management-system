const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Adjust path if your model is in another folder
const User = require("./models/userModel");

mongoose.connect("mongodb://localhost:27017/hotelDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const hashPassword = async () => {
  try {
    const user = await User.findOne({ email: "sayeda@gmail.com" });

    if (!user) {
      console.log("User not found");
      return;
    }

    // Skip if already hashed
    if (user.password.startsWith("$2a$")) {
      console.log("Password already hashed");
      return;
    }

    const hashed = await bcrypt.hash(user.password, 10);
    user.password = hashed;
    await user.save();
    console.log("Password hashed and updated successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
};

hashPassword();

