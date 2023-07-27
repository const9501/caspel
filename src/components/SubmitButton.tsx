import {useEffect, useState} from "react";
import {Button, Form} from "antd";
import type { FormInstance } from 'antd';

export const SubmitButton = ({ form }: { form: FormInstance }) => {
  const [submittable, setSubmittable] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values, form]);

  return (
    <Button type="primary" htmlType="submit" disabled={!submittable}>
      Submit
    </Button>
  );
};