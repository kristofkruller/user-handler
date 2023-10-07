import { SortOrder } from "../../util/SortOrder";

export type RecipeOrderByInput = {
  createdAt?: SortOrder;
  description?: SortOrder;
  email?: SortOrder;
  id?: SortOrder;
  phone?: SortOrder;
  title?: SortOrder;
  updatedAt?: SortOrder;
  Creator?: SortOrder;
};
