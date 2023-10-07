import { ProductCreateNestedManyWithoutUsersInput } from "./ProductCreateNestedManyWithoutUsersInput";
import { RecipeCreateNestedManyWithoutUsersInput } from "./RecipeCreateNestedManyWithoutUsersInput";
import { InputJsonValue } from "../../types";

export type UserCreateInput = {
  firstName?: string | null;
  lastName?: string | null;
  password: string;
  product?: ProductCreateNestedManyWithoutUsersInput;
  recipe?: RecipeCreateNestedManyWithoutUsersInput;
  roles: InputJsonValue;
  username: string;
};
