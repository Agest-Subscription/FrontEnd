// import { MultipleCheckboxValueType } from "@/components/formtest/MultipleCheckbox";
import { ISelectOptions, SelectValueType } from "@/constants/select";
import { EnumStruct, EnumValue } from "@/interfaces/enum";

export const enumToSelectOptions = <
  T extends SelectValueType = SelectValueType,
>(
  enumObj: EnumStruct<T>,
): ISelectOptions<T>[] => {
  return Object.keys(enumObj).map((key) => ({
    label: enumObj[key].label,
    value: enumObj[key].value,
  }));
};
// export const enumToMultiCheckboxOptions = <
//   T extends MultipleCheckboxValueType = MultipleCheckboxValueType,
// >(
//   enumObj: EnumStruct<T>,
// ): CheckboxOptionType<T>[] => {
//   return Object.keys(enumObj).map((key) => ({
//     label: enumObj[key].label,
//     value: enumObj[key].value,
//   }));
// };

export const getEnumFromValue = <
  T extends SelectValueType = SelectValueType,
  V extends Record<string, any> = {},
>(
  enumObj: EnumStruct<T, V>,
  value: T,
): EnumValue<T, V> | null =>
  Object.values(enumObj).find((enumItem) => enumItem.value === value) ?? null;
