import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "antd";

import DynamicInput from "./DynamicInput";
import FormWrapperV2 from "./FormWrapperV2";
import { testschema, testType } from "./testSchema";
import { yupResolver } from "@hookform/resolvers/yup";

type Props = {};
const fields = [
  {
    label: "Name",
    type: "number",
    name: "test1",
    style: {
      marginTop: "30px",
      marginBottom: "30px",
    },
  },
  {
    label: "Equipment Type",
    type: "date",
    name: "test2",
    style: {
      marginTop: "30px",
      marginBottom: "30px",
    },
  },
];
const TestModal = (props: Props) => {
  const methods = useForm<testType>({
    mode: "onBlur",
    // resolver: yupResolver(testschema),
  });
  function onSubmit(data: any) {
    console.log(data);
  }

  //render
  return (
    <div>
      <FormWrapperV2 methods={methods}>
        <Form onFinish={methods.handleSubmit(onSubmit)}>
          <DynamicInput name="name.lastName" type="text" label="name" />
          {/* <DynamicInput name="age" type="number" label="age" />
          <DynamicInput name="isStudent" type="checkbox" label="isStudent" /> */}
          <Button htmlType="submit">Save</Button>
        </Form>
      </FormWrapperV2>
    </div>
  );
};

export default TestModal;
