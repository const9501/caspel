import {Button, DatePicker, DatePickerProps, Form, Input, InputNumber, Space} from "antd";
import {SubmitButton} from "./SubmitButton";
import {useAppDispatch} from "../hook/useAppDispatch";
import {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";
import {IAddUserForm, IUser} from "../types";
import {addUser, editUser} from "../store/usersSlice";


const AddUserForm = ({handleClose, changingUser}: IAddUserForm) => {

  const dispatch = useAppDispatch()
  const [form] = Form.useForm();
  const [date, setDate] = useState<string>('')

  const handleSubmit = (values: IUser) => {
    if (changingUser) {
      dispatch(editUser({...values, date: dayjs(values.date).format('DD.MM.YYYY'), id: changingUser.id}))
    } else {
      dispatch(addUser({...values, id: uuidv4(), date}))
    }
    handleClose()
  }

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    setDate(dateString)
  };

  useEffect(() => {
    form.resetFields()
    if (changingUser) {
      form.setFieldsValue({...changingUser, date: dayjs(changingUser?.date, 'DD.MM.YYYY')})
    }
  }, [form, changingUser])

  return (
    <Form
      onFinish={handleSubmit}
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
    >

      <Form.Item name="name" label="Name" rules={[{required: true}]}>
        <Input/>
      </Form.Item>
      <Form.Item name="age" label="Age" rules={[{required: true}, { type: 'number', min: 0, max: 150 }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item name="date" label="Date" rules={[{required: true}]}>
        <DatePicker onChange={onChange}  format="DD.MM.YYYY"/>
      </Form.Item>
      <Form.Item>
        <Space>
          <SubmitButton form={form}/>
          <Button htmlType="reset">Reset</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;