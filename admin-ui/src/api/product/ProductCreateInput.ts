import { CustomerWhereUniqueInput } from "../customer/CustomerWhereUniqueInput";

export type ProductCreateInput = {
  customer?: CustomerWhereUniqueInput | null;
  description?: string | null;
  itemPrice?: number | null;
  name?: string | null;
};
