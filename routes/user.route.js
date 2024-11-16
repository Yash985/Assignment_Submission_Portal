import express from "express";
import { admins, login, register, upload } from "../controllers/user.controller.js";
import { userValidation } from "../middlewares/userValidation.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/admins", admins);
//the below routes is protected and only accessible to the logged in users(here users or students)
router.post("/upload",userValidation,upload);


export default router;