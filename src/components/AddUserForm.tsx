import {Button, DatePicker, DatePickerProps, Form, Input, InputNumber, Space} from "antd";
import {SubmitButton} from "./SubmitButton/SubmitButton";
import {useAppDispatch} from "../hook/useAppDispatch";
import {addUser, editUser, IUser} from "../store/usersSlice";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import dayjs from "dayjs";

const AddUserForm = ({handleClose, changingUser}: {handleClose: () => void, changingUser?: IUser}) => {

  const dispatch = useAppDispatch()

  const [form] = Form.useForm();
  const [date, setDate] = useState<string>('')

  const handleSubmit = (values: IUser) => {
    if (changingUser) {
      dispatch(editUser({...values, date, id: changingUser.id}))
    } else {
      dispatch(addUser({...values, id: uuidv4(), date}))
    }
    handleClose()
  }

  const onChange: DatePickerProps['onChange'] = (_, dateString) => {
    setDate(dateString)
  };

  const dateString = '07.02.2023';
  const datee = dayjs(dateString, 'DD.MM.YYYY');
  console.log(datee);

  return (
    <Form
      onFinish={handleSubmit}
      form={form}
      name="validateOnly"
      layout="vertical"
      autoComplete="off"
      initialValues={changingUser &&{
        ["name"]: changingUser.name,
        ["age"]: changingUser.age,
        ["date"]: dayjs(changingUser.date, 'DD.MM.YYYY'),
      }}
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