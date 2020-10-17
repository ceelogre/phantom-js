import Sequelize from 'sequelize'
import config from './utils/config.js'

const configOptions = {
  logging: false
}
let db = config.env === 'development' ? new Sequelize(process.env.DB_DEV, configOptions): config.env === 'test' ? new Sequelize(process.env.DB_TEST, configOptions): new Sequelize(process.env.DATABASE_URL, configOptions)
db.authenticate()
  .then(()=>console.log('connection to db successful'))
  .catch(err=>console.log('Error while connecting to db',err))

export default db