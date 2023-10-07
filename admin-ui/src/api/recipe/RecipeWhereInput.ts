import { StringFilter } from "../../util/StringFilter";
import { StringNullableFilter } from "../../util/StringNullableFilter";
import { ProductListRelationFilter } from "../product/ProductListRelationFilter";
import { UserWhereUniqueInput } from "../user/UserWhereUniqueInput";

export type RecipeWhereInput = {
  description?: StringFilter;
  email?: StringNullableFilter;
  id?: StringFilter;
  phone?: StringNullableFilter;
  product?: ProductListRelationFilter;
  title?: StringFilter;
  user?: UserWhereUniqueInput;
};
