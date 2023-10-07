import { RecipeCreateNestedManyWithoutProductsInput } from "./RecipeCreateNestedManyWithoutProductsInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type ProductCreateInput = {
  description?: string | null;
  itemPrice?: number | null;
  name?: string | null;
  recipe?: RecipeCreateNestedManyWithoutProductsInput;
  user: UserWhereUniqueInput;
};
