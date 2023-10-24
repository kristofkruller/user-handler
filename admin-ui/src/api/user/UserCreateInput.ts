import { ProductCreateNestedManyWithoutUsersInput } from "./ProductCreateNestedManyWithoutUsersInput";
import { RecipeCreateNestedManyWithoutUsersInput } from "./RecipeCreateNestedManyWithoutUsersInput";
import { InputJsonValue } from "../../types";

export type UserCreateInput = {
  firstName: string;
  lastName: string;
  password: string;
  product?: ProductCreateNestedManyWithoutUsersInput;
  recipe?: RecipeCreateNestedManyWithoutUsersInput;
  roles: InputJsonValue;
  username: string;
};
