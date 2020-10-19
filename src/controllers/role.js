import { RolesModel } from '../models/role.js'

const createRole = (newRole) => {
  let saveRolePromise = new Promise((resolve) => {
    resolve(RolesModel.create(newRole))
  })
  return saveRolePromise
}

const getRoles = () => {
  let getRolesPromise = new Promise((resolve) => {
    resolve(RolesModel.findAll())
  })
  return getRolesPromise
}

const getRole = (id) => {
  return new Promise((resolve) => resolve(RolesModel.findAll({
    where: {
      id
    }
  })))
}
const updateRole = (id, user) => {
  let updateRolePromise = new Promise((resolve) => {
    resolve(RolesModel.update(user, {
      where: {
        id
      }
    })) 
  })
  return updateRolePromise
}

const deleteRole = (id) => {
  let deleteRolePromise = new Promise( (resolve) => {
    resolve(RolesModel.destroy(id))
  })
  return deleteRolePromise
}

export { createRole, getRoles, getRole, updateRole, deleteRole}