import { TablePaginationConfig } from "antd/es/table";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { AxiosError } from "axios";

export type TimeTracking = {
  updated_at: string | null;
  updated_by: string | null;
  created_at: string;
  created_by: string;
};

export type DashboardTab =
  | "permissions"
  | "pricing-plan"
  | "subscriptions"
  | "fee"
  | "overrate-fee"
  | "features"
  | "users";

export interface FilterBase<T extends Record<string, any>> {
  page?: number;
  page_size?: number;
  order?: "desc" | "asc";
  order_by?: keyof T;
  search?: string;
}

export type DataSourceItem<T> = T & {
  key: string | number;
};

export interface TableParams<T> {
  pagination: TablePaginationConfig;
  sorter?: SorterResult<DataSourceItem<T>>;
  filters?: Record<string, FilterValue | null>;
}
export interface TableChangeParams<T> extends Omit<TableParams<T>, "sorter"> {
  sorter?: SorterResult<DataSourceItem<T>> | SorterResult<DataSourceItem<T>>[];
}

export interface CustomError extends AxiosError {
  response?: AxiosError["response"] & {
    data?: {
      detail?: string[] | string;
    };
  };
}
export interface GetListResponse<T> {
  total: number;
  data: T[];
  pagination: {
    current_token: number;
    page_size: number;
    next_token: number | null;
  };
}
