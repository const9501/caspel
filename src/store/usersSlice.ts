import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import {IUser} from "../types";



const initialState: IUser[] = [
  {
    id: uuidv4(),
    name: 'Leanne Graham',
    age: 23,
    date: '30.05.2000'
  },
  {
    id: uuidv4(),
    name: 'Ervin Howell',
    age: 22,
    date: '22.05.2001'
  },
  {
    id: uuidv4(),
    name: 'Clementine Bauch',
    age: 20,
    date: '03.10.2000'
  },
  {
    id: uuidv4(),
    name: 'Mef',
    age: 26,
    date: '28.05.1992'
  },
  {
    id: uuidv4(),
    name: 'Patricia Lebsack',
    age: 27,
    date: '28.05.1997'
  },
  {
    id: uuidv4(),
    name: 'Chelsey Dietrich',
    age: 27,
    date: '28.05.1998'
  },
  {
    id: uuidv4(),
    name: 'Leopoldo Corkery',
    age: 29,
    date: '28.05.1999'
  },
  {
    id: uuidv4(),
    name: 'Kurtis Weissnat',
    age: 24,
    date: '06.02.2001'
  },
  {
    id: uuidv4(),
    name: 'Nicholas Runolfsdottir',
    age: 29,
    date: '16.05.2004'
  },
  {
    id: uuidv4(),
    name: 'Glenna Reichert',
    age: 24,
    date: '06.02.2004'
  },

]

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.push(action.payload)

    },
    deleteUser: (state, action: PayloadAction<string>) => {

      const id = action.payload
      return state.filter(user => user.id !== id)

    },
    editUser: (state, action: PayloadAction<IUser>) => {
      return state.map(user => {
        return  action.payload.id === user.id ? {...action.payload} : {...user}
      })

    }
  }
})

export default usersSlice.reducer

export const selectAllUsers = (state: IUser[]): IUser[] => state

export const selectFilteredUsers = (state: IUser[], search: string, searchBy: string): IUser[] => {
  if (searchBy === 'date') {
    return state.filter((user) => user.date.toLowerCase().includes(search))
  } else if (searchBy === 'age') {
    return state.filter((user) => user.age.toString().includes(search))
  } else {
    return state.filter((user) => user.name.toLowerCase().includes(search))
  }
}

export const {addUser, deleteUser, editUser} = usersSlice.actions