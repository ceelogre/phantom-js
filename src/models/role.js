import pkg from 'sequelize'
const { DataTypes } = pkg
import sequelize from '../connection.js'

const possibleRoles = {
  BASIC: 'passenger',
  STANDARD: 'driver',
  MANAGER: 'operator',
  SUPER: 'admin'
}

const Role = sequelize.define('Role', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export {possibleRoles, Role as RoleModel}