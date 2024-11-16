import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Assignment from "../models/assignment.model.js";
export const register = async (req, res) => {
  const { userId, password } = req.body;
  try {
    //We should always check if the user already exists before registering the user
    const userExists = await User.findOne({ userId, role: "user" });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    //Proper validation should be done before storing the user in the database
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 8 characters" });
    }
    //We should always hash password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userId, password: hashedPassword });
    res
      .status(201)
      .json({ msg: "User registered successfully", userId: user.userId });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while registering the user" });
  }
};
export const login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId, role: "user" });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    //We must always compare password only if the user exists in our database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //using jwt token to authenticate the user and create a session
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    //Here using cookie to store the token in the browser
    //This way we can authenticate the user for future requests
    res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json({ msg: "User logged in successfully", token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while logging the user" });
  }
};
export const upload = async (req, res) => {
  const { userId, task, admin } = req.body;
  try {
    //req.currentUser is the userId of the user who is logged in(we get this from the middleware)
    const currentUser = req.currentUser;
    if (currentUser !== userId) {
      return res
        .status(401)
        .json({ msg: "You can only upload assignment with your userId" });
    }
    const adminExist = await User.findOne({ userId: admin, role: "admin" });
    if (!adminExist) {
      return res
        .status(400)
        .json({ msg: `Admin ${admin} does not exist.Please provide valid admin` });
    }

    const assignment = await Assignment.create({
      userId,
      task,
      admin: adminExist.userId,
    });

    res.status(200).json({ msg: "File uploaded successfully", assignment });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while uploading the file" });
  }
};
export const admins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" }).select("userId -_id");
    //Returning only the userId/username of the admins
    res.status(200).json({ admins });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while fetching the admins" });
  }
};
