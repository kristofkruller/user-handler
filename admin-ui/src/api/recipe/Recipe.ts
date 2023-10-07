import { Product } from "../product/Product";
import { User } from "../user/User";

export type Recipe = {
  createdAt: Date;
  description: string;
  email: string | null;
  id: string;
  phone: string | null;
  product?: Array<Product>;
  title: string;
  updatedAt: Date;
  user?: User;
};
