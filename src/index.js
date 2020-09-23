import express from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.get('/', (req, res) => {
    res.json({
        message: 'App configured properly.'
    })
})

const userIds = [{
    id: 30
}]
app.get('/users', (req, res) => {
    res.json({
        userIds
    })
})
console.info(process.env.PORT)
app.listen(process.env.PORT, () => console.info(`Running on port ${process.env.PORT}`))