const express = require('express')
const app = express()
const port = 8001

app.use(express.static('public'))

app.get('/', (req, res) => res.send('Amaan is the maannn!'))
app.get('/hello')
app.listen(port, () => console.log(`Example app listening on port ${port}!`))