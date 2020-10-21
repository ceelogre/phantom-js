import Sudoer from '../models/sudoer.js'
import jwt from 'jsonwebtoken'
import { SUDO_SECRET } from '../utils/constants.js'

const user = {
  username: 'super',
  role: 'super'
}

let sudo 
Sudoer.findOrCreate({
  where: {
    username: user.username,
    role: 'super'
  }
})
  .then()
  .catch( error => console.error(error, 'Didn\'t sudo.'))

// Create a token for the super user
jwt.sign(user, SUDO_SECRET, { expiresIn: '1d'}, (err, token) => {
  if(err) console.error(err)
  sudo = token
  console.info(token)
})
export { sudo }