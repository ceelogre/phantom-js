import { Sequelize, DataTypes } from 'sequelize'
const sequelize = new Sequelize('postgres://alien@localhost/phantom_development')

const userRoles = {
  NORMAL: 'normal',
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
  role: {
    type: DataTypes.STRING,
    defaultValue: userRoles.NORMAL
  },
  password: {
    type: DataTypes.STRING
    //Can be null
  }
})

export {User as userModel }