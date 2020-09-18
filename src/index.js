import express from 'express'

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
let PORT = process.env.PORT || 3000

app.listen(PORT, () => console.info('Running'))