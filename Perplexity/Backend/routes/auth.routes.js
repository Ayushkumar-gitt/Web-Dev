import { Router } from "express";
import registerUser from "../controllers/auth.controller.js";
import { registerValidator } from "../middlewares/auth.validator.js";

const authRouter = Router();

authRouter.post("/register", registerValidator, registerUser);

export default authRouter;
