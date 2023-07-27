
export interface IUser {
  id: string
  name: string
  date: string
  age: number
}

export interface IAddUserForm {
  handleClose: () => void
  changingUser?: IUser
}

