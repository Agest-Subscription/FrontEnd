import { useForm } from "react-hook-form";
import { Button, Form } from "antd";

import AddTestForm from "./TestForm";
import useGenerateFields, { TestField } from "./useGenerateField";

import FormWrapperV2 from "@/components/formV2/FormWrapperV2";

const TestModalV2 = () => {
  const methods = useForm<TestField>({
    mode: "onBlur",
    // resolver: yupResolver(testschema),
  });
  const fields = useGenerateFields();
  function onSubmit(data: any) {
    console.log(data);
  }

  //render
  return (
    <FormWrapperV2 methods={methods} fields={fields}>
      <Form onFinish={methods.handleSubmit(onSubmit)}>
        <AddTestForm />
        <Button htmlType="submit">Save</Button>
      </Form>
    </FormWrapperV2>
  );
};

export default TestModalV2;
