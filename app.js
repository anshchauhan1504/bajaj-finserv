const express = require('express')
const app = express()


app.use(express.json())
const bfhlRouter = require('./routes/bfhl')
app.use('/bfhl', bfhlRouter)
app.listen(3000)
