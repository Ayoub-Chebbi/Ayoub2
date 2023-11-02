const express = require("express")
const app = express()
const cors = require("cors")

app.use(cors(), express.json() , express.urlencoded({extended: true}))

require("dotenv").config()
require("./config/config")
require("./routes/routes")(app)

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server running on ${port} `)
})