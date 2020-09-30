import { userModel } from '../models/user.js'

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

const getUser = (id) => {
  return new Promise((resolve) => resolve(userModel.findAll({
    where: {
      id
    }
  })))
}
const updateUser = (id, user) => {
  let updateUserPromise = new Promise((resolve) => {
    resolve(userModel.update(user, {
      where: {
        id
      }
    })) 
  })
  return updateUserPromise
}

const deleteUser = (id) => {
  let deleteUserPromise = new Promise( (resolve) => {
    resolve(userModel.destroy(id))
  })
  return deleteUserPromise
}

export { createUSer, getUsers, getUser, updateUser, deleteUser}