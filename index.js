import express from "express";
import { connectDB } from "./db.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
const PORT = 3000;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
