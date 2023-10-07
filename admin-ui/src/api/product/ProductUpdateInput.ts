import { RecipeUpdateManyWithoutProductsInput } from "./RecipeUpdateManyWithoutProductsInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProductUpdateInput = {
  description?: string | null;
  itemPrice?: number | null;
  name?: string | null;
  recipe?: RecipeUpdateManyWithoutProductsInput;
  user?: UserWhereUniqueInput;
};
