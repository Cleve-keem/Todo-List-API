import z from "zod";
import { TodoInputSchema } from "../zod/todo.zod.js";
import { Optional } from "sequelize";

export type TodoInputType = z.infer<typeof TodoInputSchema>;

export interface TodoAttributes extends TodoInputType {
  id: number;
  userID: number;
}

export type TodoCreationAttributes = Optional<TodoAttributes, "id">;
