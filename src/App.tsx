import {useState} from "react";
import {Button, Input, Modal, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import {deleteUser, IUser, selectFilteredUsers} from "./store/usersSlice";
import {useAppSelector} from "./hook/useAppSelector";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {useAppDispatch} from "./hook/useAppDispatch";
import AddUserForm from "./components/AddUserForm";
import dayjs from "dayjs";


const App = () => {


  const [search, setSearch] = useState<string>('')
  const filteredUsers = useAppSelector((state) => selectFilteredUsers(state, search))

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch()

  const [userChange, setUserChange] = useState<IUser>()


  const columns: ColumnsType<IUser> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name)
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date)
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Actions',
      render: (user) => {
        return (
          <div className='actions-wrapper'>
            <DeleteOutlined
              className='action-icon'
              title='Delete'
              onClick={() => dispatch(deleteUser(user.id))}
            />

            <EditOutlined
              onClick={() => {
                showModal()
                setUserChange(user)
              }}
              className='action-icon'
              title='Edit'
            />
          </div>
        )
      }
    }
  ]


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='wrapper'>

      <div className='header'>
        <Input
          size="large"
          placeholder="Enter name..."
          onChange={(event) => setSearch(event.target.value)}
          prefix={<SearchOutlined/>}
          className='search-input'
        />

        <Button type="primary" size='large' onClick={showModal}>
          Add new user
        </Button>
      </div>


      <Table
        columns={columns}
        rowKey={'id'}
        dataSource={filteredUsers}
        pagination={false}
        className='table'
      />

      <Modal
        title={userChange ? 'Edit user' : 'Add new user'}
        open={isModalOpen}
        onOk={handleClose}
        onCancel={handleClose}
        footer={[
          <Button key="back" onClick={handleClose}>
            Cancel
          </Button>,
        ]}
      >
        <AddUserForm changingUser={userChange} handleClose={handleClose}/>
      </Modal>
    </div>
  );
}

export default App;