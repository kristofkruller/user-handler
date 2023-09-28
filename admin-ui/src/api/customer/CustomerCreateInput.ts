import { AddressWhereUniqueInput } from "../address/AddressWhereUniqueInput";
import { ProductCreateNestedManyWithoutCustomersInput } from "./ProductCreateNestedManyWithoutCustomersInput";

export type CustomerCreateInput = {
  address?: AddressWhereUniqueInput | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  products?: ProductCreateNestedManyWithoutCustomersInput;
};
