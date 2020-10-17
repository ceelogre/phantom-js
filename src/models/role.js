import pkg from 'sequelize'
const { DataTypes } = pkg
import sequelize from '../connection.js'



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

export {Role as RolesModel}