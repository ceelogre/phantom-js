import sequelize from '../connection.js'
import pkg from 'sequelize'
const { DataTypes } = pkg

const Sudoer = sequelize.define('Sudoer', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  role: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING
    //Can be null
  }
})

export default Sudoer