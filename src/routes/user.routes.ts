import { Router } from "express";
import UserController from "../controllers/userController.js";
import { validate } from "../middleware/validator.js";
import { UserLoginSchema, UserRegisterSchema } from "../dtos/zod/user.zod.js";

const router = Router();

router.post(
  "/register",
  validate(UserRegisterSchema),
  UserController.registerUser,
);
router.post("/login", validate(UserLoginSchema), UserController.loginUser);

export default router;
