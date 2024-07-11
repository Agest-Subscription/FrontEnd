import { Permission } from "./permission.type";

export type feature = {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
  fee_type: string;
  is_valid: boolean;
  created_at: string;
  updated_at: string;
};
