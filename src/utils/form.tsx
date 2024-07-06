import { CurrencyField } from "@/components/form/CurrencyField";
import { DatePicker } from "@/components/form/DatePicker";
import { MultipleCheckbox } from "@/components/form/MultipleCheckbox";
import { PhoneNumberField } from "@/components/form/PhoneNumber";
import { Select } from "@/components/form/Select";
import { SingleCheckbox } from "@/components/form/SingleCheckbox";
import { TextArea } from "@/components/form/Textarea";
import { TextField } from "@/components/form/TextField";
import { TimePicker } from "@/components/form/TimePicker";
import { FieldData } from "@/interfaces/form";

export const generateFormField = (
  // @ts-ignore-next-line
  field: FieldData<any, any, any> & { name: string },
): React.ReactNode => {
  switch (field.type) {
    case "text": {
      const { name, label, type: _, componentProps } = field;
      return <TextField label={label} name={name} {...componentProps} />;
    }

    case "select": {
      const { label, name, options, type: _, componentProps } = field;
      return (
        <Select
          label={label}
          name={name}
          options={options}
          {...componentProps}
        />
      );
    }

    case "singleCheckbox": {
      const { label, name, type: _, componentProps } = field;
      return <SingleCheckbox name={name} label={label} {...componentProps} />;
    }

    case "multipleCheckbox": {
      const { label, name, options, type: _, componentProps } = field;
      return (
        <MultipleCheckbox
          name={name}
          label={label}
          options={options}
          {...componentProps}
        />
      );
    }

    case "textarea": {
      const { label, name, type: _, componentProps } = field;
      return <TextArea name={name} label={label} {...componentProps} />;
    }

    case "datepicker": {
      const { label, name, type: _, componentProps } = field;
      return <DatePicker name={name} label={label} {...componentProps} />;
    }

    case "timepicker": {
      const { label, name, type: _, componentProps } = field;
      return <TimePicker name={name} label={label} {...componentProps} />;
    }

    case "phoneNumber": {
      const { label, name, type: _, componentProps } = field;
      return <PhoneNumberField name={name} label={label} {...componentProps} />;
    }

    case "currency": {
      const { label, name, type: _, componentProps } = field;
      return <CurrencyField name={name} label={label} {...componentProps} />;
    }

    default:
      return null;
  }
};

export const getObjectValueWithPath = (
  obj: Record<string, any> | null | undefined,
  path: string,
): any => {
  if (typeof obj !== "object") return null;
  const pathArray = path.split(".");
  const firstPath = pathArray.shift();

  if (!firstPath) return null;
  if (pathArray.length === 0) return obj?.[firstPath];

  return getObjectValueWithPath(obj?.[firstPath], pathArray.join("."));
};

export const includeIndexToName = (name: string, index: number[]): string => {
  let result = name;
  index.forEach((i) => {
    result = result.replace("[]", i.toString());
  });

  return result;
};
