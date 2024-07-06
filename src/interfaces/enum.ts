export type EnumValue<T = string, V extends Record<string, any> = {}> = {
  label: string;
  value: T;
} & V;

export interface EnumStruct<T = string, V extends Record<string, any> = {}> {
  [key: string]: EnumValue<T, V>;
}
