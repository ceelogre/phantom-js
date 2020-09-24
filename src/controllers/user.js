import { userModel } from '../models/user'

const createUSer = (newUser) => {
  let saveUserPromise = new Promise((resolve) => {
    resolve(userModel.create(newUser))
  })
  return saveUserPromise
}

const getUsers = () => {
  let getUsersPromise = new Promise((resolve) => {
    resolve(userModel.findAll())
  })

  return getUsersPromise
}

export { createUSer, getUsers}