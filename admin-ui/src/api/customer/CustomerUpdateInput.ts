import { AddressWhereUniqueInput } from "../address/AddressWhereUniqueInput";
import { ProductUpdateManyWithoutCustomersInput } from "./ProductUpdateManyWithoutCustomersInput";

export type CustomerUpdateInput = {
  address?: AddressWhereUniqueInput | null;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  products?: ProductUpdateManyWithoutCustomersInput;
};
