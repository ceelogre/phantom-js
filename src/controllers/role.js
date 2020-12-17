import { RoleModel } from '../models/role.js'

const createRole = (newRole) => {
  let saveRolePromise = new Promise((resolve) => {
    resolve(RoleModel.create(newRole))
  })
  return saveRolePromise
}

const getRoles = () => {
  let getRolesPromise = new Promise((resolve) => {
    resolve(RoleModel.findAll())
  })
  return getRolesPromise
}

const getRole = (id) => {
  return new Promise((resolve) => resolve(RoleModel.findAll({
    where: {
      id
    }
  })))
}
const updateRole = (id, role) => {
  let updateRolePromise = new Promise((resolve) => {
    resolve(RoleModel.update(role, {
      where: { id }
    })) 
  })
  return updateRolePromise
}

const deleteRole = (id) => {
  let deleteRolePromise = new Promise( (resolve) => {
    resolve(RoleModel.destroy({
      where: {id}
    }))
  })
  return deleteRolePromise
}

export { createRole, getRoles, getRole, updateRole, deleteRole}