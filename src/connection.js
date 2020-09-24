import Sequelize from 'sequelize'

const db = new Sequelize('postgres://alien@localhost/phantom_development')
db.authenticate()
  .then(()=>console.log('connection to db successful'))
  .catch(err=>console.log('Error while connecting to db',err))