const express = require('express')
const app = express()
app.use(express.json())
const PORT= 7000

const apiRoutes =require('./routes/apiRoutes')

app.use('/api',apiRoutes)

app.listen(PORT,()=>{
    console.log(`listening at PORT =${PORT}`)
})