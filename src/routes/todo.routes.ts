import { Router } from "express";
import TodoController from "../controllers/todoController.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = Router();

router.use(authenticateToken)

router.post("/", TodoController.createTodo);

export default router;