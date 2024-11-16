import express from "express";
import { register,login,assignments,acceptAssignment,rejectAssignment} from "../controllers/admin.controller.js";
import { userValidation } from "../middlewares/userValidation.js";
const router = express.Router();

router.post("/register",register);
router.post("/login", login);
//All the below routes are protected and only accessible to the logged in users(here admins)
router.get("/assignments",userValidation,assignments);
router.post("/assignments/:id/accept",userValidation,acceptAssignment);
router.post("/assignments/:id/reject",userValidation,rejectAssignment);

export default router;