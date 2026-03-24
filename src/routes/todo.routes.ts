import { Router } from "express";
import TodoController from "../controllers/todoController.js";
import { authenticateToken } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validator.js";
import { TodoInputSchema } from "../dtos/zod/todo.zod.js";

const router = Router();

router.use(authenticateToken);

router.post("/", validate(TodoInputSchema), TodoController.createTodo);
router.get("/", TodoController.fetchAllTodos);
router.get("/:id", TodoController.fetchOneTodo);
router.put("/:id", validate(TodoInputSchema), TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;
