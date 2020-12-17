import { possibleRoles } from '../models/role.js'
const returnRoleEnum = (givenRole) => {
  // loop through all roles
  for (const role in possibleRoles) {
    if (possibleRoles[role] == givenRole) 
      return role
  }
  return 'unknown role'
}

export {returnRoleEnum}