import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import { I18n } from 'i18n'
import path from 'path'

import './connection'
import userRouter from './routes/user'


const i18n = new I18n({
  locales: ['en', 'rw', 'fr'],
  directory: path.join(__dirname, 'locales')
})

const app = express()
app.use(bodyParser.json())
app.use(i18n.init)

app.get('/', (req, res) => {
  res.json({
    message: res.__('welcome')
  })
})
app.use('/users', userRouter)

app.use(
  (req, res) => {
    let message = res.__('404')
    res.json({ message })
  }
)
let PORT = process.env.PORT

app.listen(PORT, () => console.info(`Running on port ${PORT}`))
