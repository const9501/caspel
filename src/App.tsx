import {useState} from "react";
import {Button, Input, Modal, Table} from 'antd';
import type {ColumnsType, TableProps} from 'antd/es/table';
import {deleteUser, IUser, selectAllUsers, selectFilteredUsers} from "./store/usersSlice";
import {useAppSelector} from "./hook/useAppSelector";
import {DeleteFilled, DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {useAppDispatch} from "./hook/useAppDispatch";



const App = () => {

  const [search, setSearch] = useState<string>('')
  const users = useAppSelector(selectAllUsers)
  const filteredUsers = useAppSelector((state) => selectFilteredUsers(state, search))

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch()


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
              onClick={showModal}
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

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='wrapper'>

      <div className='header'>
        <Input
          size="large"
          placeholder="large size"
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

      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}

export default App;