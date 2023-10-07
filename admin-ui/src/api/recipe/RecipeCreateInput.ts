import { ProductCreateNestedManyWithoutRecipesInput } from "./ProductCreateNestedManyWithoutRecipesInput";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type RecipeCreateInput = {
  description: string;
  email?: string | null;
  phone?: string | null;
  product?: ProductCreateNestedManyWithoutRecipesInput;
  title: string;
  user: UserWhereUniqueInput;
};
