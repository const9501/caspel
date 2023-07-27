import {useRef, useState} from "react";
import {Button, Input, InputRef, Modal, Space, Table} from 'antd';
import {deleteUser, IUser, selectFilteredUsers} from "./store/usersSlice";
import {useAppSelector} from "./hook/useAppSelector";
import {DeleteOutlined, EditOutlined, SearchOutlined} from "@ant-design/icons";
import {useAppDispatch} from "./hook/useAppDispatch";
import AddUserForm from "./components/AddUserForm";
import {FilterConfirmProps} from "antd/es/table/interface";

import type { ColumnType, ColumnsType } from 'antd/es/table';

type DataIndex = keyof IUser;

const App = () => {

  const [search, setSearch] = useState<string>('')
  const filteredUsers = useAppSelector((state) => selectFilteredUsers(state, search))

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch()

  const [userChange, setUserChange] = useState<IUser>()




  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };



  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };




  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<IUser> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     text
    //   ) : (
    //     text
    //   ),
  });

  const columns: ColumnsType<IUser> = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      sorter: (a, b) => a.date.localeCompare(b.date),
      ...getColumnSearchProps('date'),

    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
      ...getColumnSearchProps('age'),

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