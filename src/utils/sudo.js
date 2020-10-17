import Sudoer from '../models/sudoer.js'
import jwt from 'jsonwebtoken'

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

// Create a token for the super user
jwt.sign(user, 'baghdad', { expiresIn: '1d'}, (err, token) => {
  if(err) console.error(err)
  console.info(token)
})
