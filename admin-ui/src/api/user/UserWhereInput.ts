import { StringNullableFilter } from "../../util/StringNullableFilter";
import { StringFilter } from "../../util/StringFilter";
import { ProductListRelationFilter } from "../product/ProductListRelationFilter";
import { RecipeListRelationFilter } from "../recipe/RecipeListRelationFilter";

export type UserWhereInput = {
  firstName?: StringNullableFilter;
  id?: StringFilter;
  lastName?: StringNullableFilter;
  product?: ProductListRelationFilter;
  recipe?: RecipeListRelationFilter;
  username?: StringFilter;
};
