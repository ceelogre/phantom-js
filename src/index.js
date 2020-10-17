import express from 'express'
import 'dotenv/config.js'
import i18n from './utils/i18n.js'
import userRouter from './routes/user.js'
import './utils/sudo.js'


const app = express()
app.use(express.json())
app.use(i18n.init)

app.get('/', (req, res) => {
  res.json({
    message: res.__('welcome')
  })
})
app.use('/users', userRouter)

app.use( '*',
  (req, res) => {
    let message = res.__('404')
    res.json({ message })
  }
)

app.use(
  (err, req, res) => {
    if (err) console.error(err)
    res.status(500).send('Internal server error...')
  }
)

let PORT = process.env.PORT

let serverInstance =  app.listen(PORT, () => console.info(`Running on port ${PORT}`))

//Clean exit on crashes
process.on('uncaughtException', () => {
  serverInstance.close()
})
export default app