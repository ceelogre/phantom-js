import pkg from 'sequelize'
const { DataTypes } = pkg
import sequelize from '../connection.js'
import { RoleModel } from './role.js'


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

User.belongsTo(RoleModel)
export {User as UserModel }