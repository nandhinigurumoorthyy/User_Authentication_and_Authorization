const mongoose = require("mongoose");
const argon2 = require("argon2");

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure unique email addresses
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      default: null, // Default to null if not provided
    },
    age: {
      type: Number,
      default: null, // Default to null if not provided
    },
  },
  { timestamps: true }
);

// Pre-save middleware for hashing password
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await argon2.hash(this.password); // Hashing with argon2
    next();
  } catch (error) {
    console.error("Error hashing the password:", error);
    next(error);
  }
});

// Method to compare hashed password with plain text password
UserSchema.methods.comparePassword = async function (plainPassword) {
  try {
    return await argon2.verify(this.password, plainPassword); // Verifying with argon2
  } catch (error) {
    console.error("Error comparing password:", error);
    throw error;
  }
};

// Create model
const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
