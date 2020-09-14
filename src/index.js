import express from 'express'

const app = express()

app.get('*', (req, res) => {
    res.json({
        message: 'App configured properly.'
    })
})

const PORT = 3000
app.listen(PORT, () => console.info('Running'))