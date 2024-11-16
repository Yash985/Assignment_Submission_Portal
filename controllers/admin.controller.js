import User from "../models/user.model.js";
import Assignment from "../models/assignment.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { userId, password } = req.body;
  try {
    //Always check if the admin already exists before registering a new admin
    const adminExists = await User.findOne({ userId, role: "admin" });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    //Proper validation should always be done before storing the data in the database
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 8 characters" });
    }
    //We should always hash password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await User.create({
      userId,
      password: hashedPassword,
      role: "admin",
    });
    res.status(201).json({
      msg: "Admin registered successfully",
      userId: admin.userId,
      role: admin.role,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while registering the admin" });
  }
};
export const login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const admin = await User.findOne({ userId, role: "admin" });
    if (!admin) {
      return res.status(400).json({ message: "Admin does not exist" });
    }
    //We must always compare password only if the user exists in our database
    const isPasswordCorrect = await bcrypt.compare(password, admin.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //using jwt token to authenticate the user and create a session
    const token = jwt.sign(
      { userId, role: admin.role },
      process.env.JWT_SECRET
    );

    //Here using cookie to store the token in the browser
    //This way we can authenticate the user for future requests
    res
      .cookie("token", token, { httpOnly: true }) //
      .status(200)
      .json({ msg: "Admin logged in successfully", token });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while logging the admin" });
  }
};
export const assignments = async (req, res) => {
  try {
    //req.currentUser will have the userId of the logged in admin(we get this from the middleware)
    const admin = req.currentUser;
    //Fetching all the assignments for the logged in admin
    const assignments = await Assignment.find({ admin }).select("-admin -__v");
    res.status(200).json({ assignments });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while fetching assignments" });
  }
};
export const acceptAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    //req.currentUser will have the userId of the logged in admin(we get this from the middleware)
    const admin = req.currentUser;
    const assignment = await Assignment.findOne({ _id: id, admin });
    if (!assignment) {
      return res
        .status(400)
        .json({ msg: "Assignment with this id does not exist for this admin" });
    }
    assignment.status = "accepted";
    await assignment.save();
    res.status(200).json({ msg: "Assignment has been accepted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while accepting the assignment" });
  }
};
export const rejectAssignment = async (req, res) => {
  const { id } = req.params;
  try {
    //req.currentUser will have the userId of the logged in admin(we get this from the middleware)
    const admin = req.currentUser;
    const assignment = await Assignment.findOne({ _id: id, admin });
    if (!assignment) {
      return res
        .status(400)
        .json({ msg: "Assignment with this id does not exist for this admin" });
    }
    assignment.status = "rejected";
    await assignment.save();
    res.status(200).json({ msg: "Assignment has been rejected" });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ msg: "Error while rejecting the assignment" });
  }
};
