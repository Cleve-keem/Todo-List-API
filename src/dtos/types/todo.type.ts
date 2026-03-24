import z from "zod";
import { TodoInputSchema } from "../zod/todo.zod.js";
import { Optional } from "sequelize";

export interface TodoAttributes extends z.infer<typeof TodoInputSchema> {
  id: number;
  userID: number;
}

export type TodoCreationAttributes = Optional<TodoAttributes, "id">;
