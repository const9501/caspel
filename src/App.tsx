import {useState} from "react";
import {Button, Input, Modal, Select, Table} from 'antd';
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import type {ColumnsType} from 'antd/es/table';
import dayjs from "dayjs";
import AddUserForm from "./components/AddUserForm";
import {deleteUser, selectFilteredUsers} from "./store/usersSlice";
import {useAppSelector} from "./hook/useAppSelector";
import {useAppDispatch} from "./hook/useAppDispatch";
import {IUser} from "./types";


const App = () => {

  const [search, setSearch] = useState<string>('')

  const [searchBy, setSearchBy] = useState<string>('name')

  const filteredUsers = useAppSelector((state) => selectFilteredUsers(state, search, searchBy))

  const dispatch = useAppDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userChange, setUserChange] = useState<IUser>()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const columns: ColumnsType<IUser> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => {
        const date1 = dayjs(a.date, 'DD.MM.YYYY')
        const date2 = dayjs(b.date, 'DD.MM.YYYY')
        return date1.diff(date2)
      }
      ,
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


  return (
    <div className='wrapper'>

      <div className='header'>

        <div className="search-wrapper">

          <Input
            size="large"
            placeholder={`Enter ${searchBy}...`}
            onChange={(event) => setSearch(event.target.value)}
            prefix={<SearchOutlined/>}
            className='search-input'
          />

          <Select
            defaultValue="by name"
            onChange={(value) => {
              setSearchBy(value);
            }}
            options={[
              {value: 'name', label: 'by name'},
              {value: 'date', label: 'by date'},
              {value: 'age', label: 'by age'},
            ]}
          />
        </div>

        <Button type="primary" size='large' onClick={()  => {
          showModal()
          setUserChange(undefined)
        }
        }>
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