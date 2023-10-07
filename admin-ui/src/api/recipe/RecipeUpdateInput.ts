import { ProductUpdateManyWithoutRecipesInput } from "./ProductUpdateManyWithoutRecipesInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type RecipeUpdateInput = {
  description?: string;
  email?: string | null;
  phone?: string | null;
  product?: ProductUpdateManyWithoutRecipesInput;
  title?: string;
  user?: UserWhereUniqueInput;
};
