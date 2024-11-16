import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true,
      required: { type: String, message: "User ID is required" },
    },
    password: {
      type: String,
      minlength: [8, "Password must be atleast 8 characters"],
      required: { type: String, message: "Password is required" },
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
