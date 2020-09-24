import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser'
import './connection'
import userRouter from './routes/user'


const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({
    message: 'App configured properly.'
  })
})
app.use('/users', userRouter)

let PORT = process.env.PORT

app.listen(PORT, () => console.info(`Running on port ${PORT}`))
