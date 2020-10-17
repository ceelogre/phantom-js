import Sudoer from '../models/sudoer.js'
const user = {
  username: 'super',
  role: 'super'
}

Sudoer.findOrCreate({
  where: {
    username: user.username,
    role: 'super'
  }
})
  .then()
  .catch( error => console.error(error, 'Didn\'t sudo.'))