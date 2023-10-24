import { DateTimeFilter } from "../../util/DateTimeFilter";
import { StringFilter } from "../../util/StringFilter";
import { ProductListRelationFilter } from "../product/ProductListRelationFilter";
import { RecipeListRelationFilter } from "../recipe/RecipeListRelationFilter";

export type UserWhereInput = {
  createdAt?: DateTimeFilter;
  firstName?: StringFilter;
  id?: StringFilter;
  lastName?: StringFilter;
  product?: ProductListRelationFilter;
  recipe?: RecipeListRelationFilter;
  updatedAt?: DateTimeFilter;
  username?: StringFilter;
};
