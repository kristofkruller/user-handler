import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type ProductUpdateInput = {
  customer?: CustomerWhereUniqueInput | null;
  description?: string | null;
  itemPrice?: number | null;
  name?: string | null;
};
