import { Address } from "../address/Address";
import { Product } from "../product/Product";

export type Customer = {
  address?: Address | null;
  createdAt: Date;
  email: string | null;
  firstName: string | null;
  id: string;
  lastName: string | null;
  phone: string | null;
  products?: Array<Product>;
  updatedAt: Date;
};
