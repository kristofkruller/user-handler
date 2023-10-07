import { Product } from "../product/Product";
import { Recipe } from "../recipe/Recipe";
import { JsonValue } from "type-fest";

export type User = {
  createdAt: Date;
  firstName: string | null;
  id: string;
  lastName: string | null;
  product?: Array<Product>;
  recipe?: Array<Recipe>;
  roles: JsonValue;
  updatedAt: Date;
  username: string;
};
