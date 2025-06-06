import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";

import { DatePickerProps } from "@/components/formV2/DatePicker";
import { SelectProps } from "@/components/formV2/Select";
import { SingleCheckboxProps } from "@/components/formV2/SingleCheckbox";
import { TextAreaProps } from "@/components/formV2/Textarea";
import { TextFieldProps } from "@/components/formV2/TextField";
import { TimePickerProps } from "@/components/formV2/TimePicker";
import { ISelectOptions, SelectValueType } from "@/constants/select";

interface RenderColumn {
  span: number;
  label: string;
  content: string | ReactNode;
}

export interface ExtraSelectProps<T extends SelectValueType, V> {
  dropdownColumns?: (option?: ISelectOptions<T, V>) => RenderColumn[];
  dropdownLoading?: boolean;
  maxSelection?: number;
}

// For make sure the type is only a single type not an array type
// Example:
// A[] => A
// A => A
type GetValue<T extends FieldValues, K extends PathInto<T>> = T[K] extends
  | Record<string, any>[]
  | Value[]
  | null
  | undefined
  ? T[K][0]
  : T[K];

export type ButtonWrapper = {
  isButton?: boolean;
  buttonLabel?: string | ReactNode;
};

export type FieldData<
  T extends FieldValues,
  K extends PathInto<T>,
  X extends FieldValues,
> = {
  label: string | ReactNode;
} & (
  | {
      type: "text";
      componentProps?: Omit<TextFieldProps, "name" | "label">;
    }
  | {
      type: "select";
      options: ISelectOptions<Exclude<GetValue<T, K>, undefined>, X[K]>[];
      componentProps?: Omit<
        SelectProps<Exclude<GetValue<T, K>, undefined>, X[K]>,
        "name" | "label" | "options"
      >;
    }
  | {
      type: "singleCheckbox";
      componentProps?: Omit<SingleCheckboxProps, "name" | "label">;
    }
  // | {
  //     type: "multipleCheckbox";
  //     options: CheckboxOptionType<MultipleCheckboxValueType>[];
  //     componentProps?: Omit<
  //       MultipleCheckboxProps,
  //       "name" | "label" | "options"
  //     >;
  //   }
  | {
      type: "textarea";
      componentProps?: Omit<TextAreaProps, "name" | "label">;
    }
  | {
      type: "datepicker";
      componentProps?: Omit<DatePickerProps, "name" | "label">;
    }
  | {
      type: "timepicker";
      componentProps?: Omit<TimePickerProps, "name" | "label">;
    }
);

export type Value = string | number | boolean | undefined | null;

type ArrayItem = "[]";

/*
for reason why apply D and A, it is to solve the type-instantiation-is-excessively-deep-and-possibly-infinite.
Please check here:
https://stackoverflow.com/questions/76405795/type-instantiation-is-excessively-deep-and-possibly-infinite
*/
export type PathInto<
  T extends Record<string, any>,
  Deep extends boolean = false,
  D extends number = 10,
  A extends any[] = [],
> = keyof {
  [K in keyof T as T extends Value[] | undefined | null
    ? ArrayItem
    : T extends (infer Item)[] | undefined | null
      ?
          | (Deep extends true ? never : ArrayItem)
          | (Item extends Record<string, any>
              ? A["length"] extends D
                ? never
                : `${ArrayItem}.${PathInto<Item, Deep, D, [0, ...A]>}`
              : never)
      : T[K] extends Value
        ? K & string
        : T[K] extends Value[] | undefined | null
          ?
              | (Deep extends true ? never : `${K & string}`)
              | `${K & string}.${ArrayItem}`
              | (K & string)
          : T[K] extends (infer Item)[] | undefined | null
            ?
                | (Deep extends true ? never : `${K & string}`)
                | (Item extends Record<string, any>
                    ? A["length"] extends D
                      ? never
                      : A["length"] extends D
                        ? never
                        : `${K & string}.${ArrayItem}.${PathInto<
                            Item,
                            Deep,
                            D,
                            [0, ...A]
                          >}`
                    : never)
                | (K & string)
            : T[K] extends Record<string, any> | undefined | null
              ?
                  | (Deep extends true ? never : `${K & string}`)
                  | (A["length"] extends D
                      ? never
                      : `${K & string}.${PathInto<
                          Extract<T[K], Record<string, any>>,
                          Deep,
                          D,
                          [0, ...A]
                        > &
                          string}`)
                  | (K & string)
              : never]: any;
} &
  string;

// TODO: make each fields optional
export type FieldsData<
  T extends FieldValues,
  OptionsMap extends Partial<Record<PathInto<T, true>, any>> = any,
> = {
  [key in PathInto<T, true>]?: key extends PathInto<T, false>
    ? FieldData<T, key, OptionsMap>
    : never;
};

export type DeepKeyOf<
  T extends Record<string, any>,
  D extends number = 10,
  A extends any[] = [],
> = keyof {
  [K in keyof T as T extends Value[]
    ? "never"
    : T extends (infer Item)[] | undefined | null
      ? A["length"] extends D
        ? never
        : Item extends Record<string, any>
          ? DeepKeyOf<Item, D, [0, ...A]>
          : never
      : T[K] extends Value
        ? K
        : T[K] extends Value[] | undefined | null
          ? K
          : T[K] extends (infer Item)[] | undefined | null
            ?
                | K
                | (A["length"] extends D
                    ? never
                    : Item extends Record<string, any>
                      ? DeepKeyOf<Item, D, [0, ...A]>
                      : never)
            : T[K] extends infer Item | undefined | null
              ?
                  | K
                  | (A["length"] extends D
                      ? never
                      : Item extends Record<string, any>
                        ? DeepKeyOf<Item, D, [0, ...A]>
                        : never)
              : "never"]: any;
};
