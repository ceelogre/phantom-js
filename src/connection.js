import Sequelize from 'sequelize'
import config from './utils/config.js'

let db = config.env === 'development' ? new Sequelize(process.env.DB_DEV): config.env === 'test' ? new Sequelize(process.env.DB_TEST): new Sequelize(process.env.DATABASE_URL)
db.authenticate()
  .then(()=>console.log('connection to db successful'))
  .catch(err=>console.log('Error while connecting to db',err))

export default db