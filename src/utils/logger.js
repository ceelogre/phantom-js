import config from './config.js'

export default (res, error, message, status) => {

  res.status(status).json({
    message
  })
  if (config.env == 'development')
    console.error('-----\n', error, '\n\n--------')

}