import z from "zod";
import { todoInputSchema } from "../zod/todo.zod.js";
import { Optional } from "sequelize";

export type TodoInputType = z.infer<typeof todoInputSchema>;

export interface TodoAttributes extends TodoInputType {
  id: number;
  userID: number;
}

export type TodoCreationAttributes = Optional<TodoAttributes, "id">;
