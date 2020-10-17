import jwt from 'jsonwebtoken'
import { SUDO_SECRET } from '../utils/constants.js'
const whoami = (req, res, next) => {
  let responseMessage = res.__('unauth')
  let userToken = req.header('sudo')
  if (userToken == undefined) return res.status(403).json({
    message: res.__('no_auth')
  })
  let user
  try {
    user = jwt.verify(userToken, SUDO_SECRET)
  } catch(error) {
    if(error.name.startsWith('TokenExpired'))
      responseMessage = res.__('token_expired')
    else if(error.message.includes('malformed'))
      responseMessage = res.__('token_malformed')
  }
  if (user != undefined) {
    if (user.role == 'super') return next()
  }
  return res.status(403).json({
    message: responseMessage
  })
}

export default whoami
