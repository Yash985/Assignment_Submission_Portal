import jwt from "jsonwebtoken";

//This is a middleware function that will check if the user is logged in or not
//If the user is logged in, then we will proceed to the next function
export const userValidation = async (req, res, next) => {
  const loggedInUser = req.cookies.token;
  if (!loggedInUser) {
    return res.status(401).json({ msg: "Please login first" });
  }
  const decoded = jwt.verify(loggedInUser, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(401).json({ msg: "Unauthorized Request" });
  }
  //We are storing the userId in the currentUser property of the request object
  req.currentUser = decoded.userId;
  next();
};
