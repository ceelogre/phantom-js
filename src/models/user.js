import pkg from 'sequelize'
const { DataTypes } = pkg
import sequelize from '../connection.js'
import { RolesModel } from './role.js'

const userRoles = {
  NORMAL: 'passengers',
  DRIVER: 'driver',
  OPERATOR: 'operator',
  SUPER: 'admin'
}
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  RoleId: {
    type: DataTypes.NUMBER
  },
  password: {
    type: DataTypes.STRING
    //Can be null
  }
})

User.belongsTo(RolesModel)
export {User as userModel }