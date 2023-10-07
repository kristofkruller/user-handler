import { ProductUpdateManyWithoutUsersInput } from "./ProductUpdateManyWithoutUsersInput";
import { RecipeUpdateManyWithoutUsersInput } from "./RecipeUpdateManyWithoutUsersInput";
import { InputJsonValue } from "../../types";

export type UserUpdateInput = {
  firstName?: string | null;
  lastName?: string | null;
  password?: string;
  product?: ProductUpdateManyWithoutUsersInput;
  recipe?: RecipeUpdateManyWithoutUsersInput;
  roles?: InputJsonValue;
  username?: string;
};
