import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Button, Form, Select } from "antd";

const AddMultipleItems = () => {
  const { control } = useForm({
    defaultValues: {
      items: [{ period: "", basic: "", pro: "", premium: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} style={{ marginBottom: "16px" }}>
          <Form.Item label={`Period ${index + 1}`}>
            <Controller
              name={`items.${index}.period`}
              control={control}
              render={() => (
                <Select
                  options={[
                    { value: 1, label: "string" },
                    { value: 2, label: "string2" },
                    { value: 3, label: "string3" },
                  ]}
                />
              )}
            />
          </Form.Item>
          <Form.Item label={`Basic ${index + 1}`}>
            <Controller
              name={`items.${index}.basic`}
              control={control}
              render={() => (
                <Select
                  options={[
                    { value: 1, label: "string" },
                    { value: 2, label: "string2" },
                    { value: 3, label: "string3" },
                  ]}
                />
              )}
            />
          </Form.Item>
          <Form.Item label={`Pro ${index + 1}`}>
            <Controller
              name={`items.${index}.pro`}
              control={control}
              render={() => (
                <Select
                  options={[
                    { value: 1, label: "string" },
                    { value: 2, label: "string2" },
                    { value: 3, label: "string3" },
                  ]}
                />
              )}
            />
          </Form.Item>
          <Form.Item label={`Premium ${index + 1}`}>
            <Controller
              name={`items.${index}.premium`}
              control={control}
              render={() => (
                <Select
                  options={[
                    { value: 1, label: "string" },
                    { value: 2, label: "string2" },
                    { value: 3, label: "string3" },
                  ]}
                />
              )}
            />
          </Form.Item>
          <Button onClick={() => remove(index)}>Remove</Button>
        </div>
      ))}
      {fields.length < 4 && (
        <Button
          type="dashed"
          onClick={() =>
            append({ period: "", basic: "", pro: "", premium: "" })
          }
        >
          Add Item
        </Button>
      )}
    </>
  );
};

export default AddMultipleItems;
