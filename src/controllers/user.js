import { UserModel } from '../models/user.js'
import { RoleModel } from '../models/role.js'
import { returnRoleEnum } from '../utils/helpers.js'

const createUser = (newUser) => {
  if( !(Object.prototype.hasOwnProperty.call(newUser,'role')))
    return new Promise((reject) => reject('user should have a role'))
  if( returnRoleEnum(newUser.role) == 'unknown role')
    return new Promise((reject) => reject('Invalid role given'))
   
  RoleModel.findAll({
    where: {
      name: newUser.role
    },
    return: true
  })
    .then( results => {
      newUser.RoleId = results[0]
      delete newUser.role
    })
    .catch (error => {
      console.error(error)
      new Promise((reject) => {
        reject('Unable to find associated role id')
      })
    })
  let saveUserPromise = new Promise((resolve) => {

    resolve(UserModel.create(newUser))
  })
  return saveUserPromise
}

const getUsers = () => {
  let getUsersPromise = new Promise((resolve) => {
    resolve(UserModel.findAll())
  })
  return getUsersPromise
}

const getUser = (id) => {
  return new Promise((resolve) => resolve(UserModel.findAll({
    where: {
      id
    }
  })))
}
const updateUser = (id, user) => {
  let updateUserPromise = new Promise((resolve) => {
    resolve(UserModel.update(user, {
      where: {
        id
      }
    })) 
  })
  return updateUserPromise
}

const deleteUser = (id) => {
  let deleteUserPromise = new Promise( (resolve) => {
    resolve(UserModel.destroy({
      where: {id}
    }))
  })
  return deleteUserPromise
}

export { createUser, getUsers, getUser, updateUser, deleteUser}