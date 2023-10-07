import { Recipe } from "../recipe/Recipe";
import { User } from "../user/User";

export type Product = {
  createdAt: Date;
  description: string | null;
  id: string;
  itemPrice: number | null;
  name: string | null;
  recipe?: Array<Recipe>;
  updatedAt: Date;
  user?: User;
};
